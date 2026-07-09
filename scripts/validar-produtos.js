#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const CAMINHO_PRODUTOS = path.join(__dirname, "..", "data", "produtos.json");

const TIPOS_VALIDOS = ["unica", "modelo-repetivel"];

const CAMPOS_STRING_OBRIGATORIOS = ["slug", "nome", "descricao"];
const CAMPOS_STRING_OPCIONAIS = ["medidas", "tecnica"];

function validarProduto(produto, indice) {
  const erros = [];
  const rotulo = produto && produto.slug ? `produto[${indice}] (slug: "${produto.slug}")` : `produto[${indice}]`;

  if (typeof produto !== "object" || produto === null || Array.isArray(produto)) {
    return [`${rotulo}: precisa ser um objeto`];
  }

  for (const campo of CAMPOS_STRING_OBRIGATORIOS) {
    if (typeof produto[campo] !== "string" || produto[campo].trim() === "") {
      erros.push(`${rotulo}: campo "${campo}" é obrigatório e precisa ser uma string não vazia`);
    }
  }

  for (const campo of CAMPOS_STRING_OPCIONAIS) {
    if (campo in produto && typeof produto[campo] !== "string") {
      erros.push(`${rotulo}: campo opcional "${campo}" precisa ser string quando presente`);
    }
  }

  if (typeof produto.preco !== "number" || Number.isNaN(produto.preco) || produto.preco <= 0) {
    erros.push(`${rotulo}: campo "preco" é obrigatório e precisa ser um número maior que zero`);
  }

  if (!TIPOS_VALIDOS.includes(produto.tipo)) {
    erros.push(`${rotulo}: campo "tipo" precisa ser um de: ${TIPOS_VALIDOS.join(", ")}`);
  }

  if ("destaque" in produto && typeof produto.destaque !== "boolean") {
    erros.push(`${rotulo}: campo opcional "destaque" precisa ser boolean quando presente`);
  }

  if (
    !Array.isArray(produto.imagens) ||
    produto.imagens.length === 0 ||
    !produto.imagens.every((img) => typeof img === "string" && img.trim() !== "")
  ) {
    erros.push(`${rotulo}: campo "imagens" precisa ser um array com pelo menos 1 string não vazia`);
  }

  return erros;
}

function validarSlugsUnicos(produtos) {
  const contagem = new Map();
  for (const produto of produtos) {
    if (typeof produto?.slug !== "string") continue;
    contagem.set(produto.slug, (contagem.get(produto.slug) ?? 0) + 1);
  }
  return [...contagem.entries()]
    .filter(([, total]) => total > 1)
    .map(([slug, total]) => `slug "${slug}" aparece ${total} vezes — precisa ser único`);
}

function main() {
  let conteudo;
  try {
    conteudo = fs.readFileSync(CAMINHO_PRODUTOS, "utf-8");
  } catch (erro) {
    console.error(`Não foi possível ler ${CAMINHO_PRODUTOS}: ${erro.message}`);
    process.exit(1);
  }

  let produtos;
  try {
    produtos = JSON.parse(conteudo);
  } catch (erro) {
    console.error(`${CAMINHO_PRODUTOS} não é um JSON válido: ${erro.message}`);
    process.exit(1);
  }

  if (!Array.isArray(produtos)) {
    console.error(`${CAMINHO_PRODUTOS} precisa conter um array de peças no nível raiz`);
    process.exit(1);
  }

  const erros = produtos.flatMap(validarProduto).concat(validarSlugsUnicos(produtos));

  if (erros.length > 0) {
    console.error(`✗ ${erros.length} problema(s) encontrado(s) em ${produtos.length} peça(s):\n`);
    erros.forEach((erro) => console.error(`  - ${erro}`));
    process.exit(1);
  }

  console.log(`✓ ${produtos.length} peça(s) validada(s) com sucesso em data/produtos.json`);
}

main();
