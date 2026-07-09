import { ativarMenuMobile } from "./menu.js";
import { carregarConfig, preencherContato, preencherIdentidade, preencherSobre } from "./config.js";

async function iniciar() {
  ativarMenuMobile();

  const config = await carregarConfig();
  document.title = `Sobre — ${config.nomeLoja}`;
  preencherIdentidade(config);
  preencherContato(config);
  preencherSobre(config);
}

iniciar().catch((erro) => console.error("Falha ao iniciar a página Sobre:", erro));
