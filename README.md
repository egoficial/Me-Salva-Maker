# Me Salva Course Auto Completer

Este projeto é um script JavaScript que automatiza a conclusão de aulas nos cursos do **Me Salva**, permitindo que os usuários avancem rapidamente para a próxima aula após marcar a atual como concluída.

## Funcionalidades

- **Marcação Automática de Aula**: O script envia uma solicitação para a API do Me Salva, notificando que a aula foi concluída.
- **Navegação Automática**: Após marcar a aula, o script clica automaticamente no botão para ir para a próxima aula.
- **Logs de Status**: Mensagens de sucesso ou erro são registradas no console para fácil monitoramento.

## Bookmarklet

Para facilitar o uso do script, você pode adicioná-lo como um bookmarklet na sua barra de favoritos. Siga os passos abaixo:

1. **Crie o Bookmarklet**:
   - Copie o código do script.
```javascript
javascript:(async()=>{"use strict";const construirUrl=(originalUrl)=>{const url=new URL(originalUrl);const partesCaminho=url.pathname.split('/');const idExercicio=partesCaminho[partesCaminho.length-1];const novoCaminho=`/app/_next/data/eotWR84n2AGZWHLCKUcH5/exercicio/${idExercicio}.json`;const parametros=new URLSearchParams(url.search);parametros.append('conteudo','exercicio');parametros.append('conteudo',idExercicio);return`https://www.mesalva.com${novoCaminho}?${parametros.toString()}`;};const padraoUrl=/^https:\/\/www\.mesalva\.com\/app\/exercicio\/[a-z0-9\-]+(\?contexto=[^&]+&lista=[^&]+&modulo=[^&]+)?$/;let hrefAntigo=document.location.href;const observador=new MutationObserver(async()=>{if(hrefAntigo!==document.location.href){hrefAntigo=document.location.href;if(padraoUrl.test(hrefAntigo)){await new Promise(resolve=>setTimeout(resolve,1000));const urlResposta=construirUrl(hrefAntigo);console.log(`${urlResposta}`);try{const respostaPrevia=await fetch(urlResposta,{method:"GET"});if(!respostaPrevia.ok){alert('Erro ao tentar buscar a resposta');return;}const respostaJson=await respostaPrevia.json();const listaRespostas=respostaJson.pageProps.content.children[0].list;const respostaCorreta=listaRespostas.find(resposta=>resposta.isCorrect===true);if(respostaCorreta){console.log(`[DEBUG] -- ${JSON.stringify(respostaCorreta)} --`);const botoesRespostas=document.querySelectorAll('.exercise-answer__button');let clicado=false;botoesRespostas.forEach(botao=>{const letraElemento=botao.querySelector('.exercise-answer__letter');if(letraElemento&&letraElemento.textContent.trim()===respostaCorreta.letter){botao.click();clicado=true;}});if(clicado){const botaoSubmeter=document.querySelector('.btn.btn--primary.btn--size-md.submit-button');if(botaoSubmeter){botaoSubmeter.click();await new Promise(resolve=>setTimeout(resolve,1000));const botaoProximo=document.querySelector('.btn.btn--primary.btn--size-md');if(botaoProximo){botaoProximo.click();}}}}else{console.log("Resposta não encontrada.");}}catch(error){console.error('Erro ao buscar resposta:',error);}}}});observador.observe(document.body,{childList:true,subtree:true});})();
```
  
2. **Adicione o Bookmarklet**:
   - Abra seu navegador e vá para a barra de favoritos.
   - Crie um novo favorito (bookmark) e cole o código do script na URL do favorito.
   - Dê um nome ao bookmark e salve-o.

## Como Usar

1. **Acesse uma Aula**: Navegue até a página de uma aula do curso na plataforma Me Salva e faça login na sua conta.

2. **Abra o Console do Navegador**: Pressione F12 ou Ctrl + Shift + I para abrir as ferramentas de desenvolvedor.

3. **Cole e Execute o Script**: Cole o código do script no console e pressione Enter.

4. **Aguarde a Conclusão**: O script marcará a aula como concluída e automaticamente navegará para a próxima aula.

## Observações

- **Uso Responsável**: Utilize este script de forma responsável. A automação excessiva pode violar os termos de uso do Me Salva.
- **Mudanças na Estrutura do Site**: O funcionamento do script pode ser afetado se o Me Salva alterar a estrutura da página ou a API. Esteja atento a possíveis atualizações.
- **Cookies**: O script utiliza os cookies do navegador para manter a sessão ativa. Não remova os cookies durante a execução.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhoria, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Mozilla Public License Version 2.0. Consulte o arquivo LICENSE para mais detalhes.

---

**Atenção**: Este script é uma ferramenta de automação e deve ser usado de acordo com as diretrizes e políticas do Me Salva. O uso indevido pode resultar em penalizações na conta.
