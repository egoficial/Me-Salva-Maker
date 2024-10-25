javascript:(async () => {
    'use strict';

    const construirUrl = (originalUrl) => {
        const url = new URL(originalUrl);
        const partesCaminho = url.pathname.split('/');
        const idExercicio = partesCaminho[partesCaminho.length - 1];
        const novoCaminho = `/app/_next/data/eotWR84n2AGZWHLCKUcH5/exercicio/${idExercicio}.json`;
        const parametros = new URLSearchParams(url.search);
        parametros.append('conteudo', 'exercicio');
        parametros.append('conteudo', idExercicio);
        return `https://www.mesalva.com${novoCaminho}?${parametros.toString()}`;
    };

    const padraoUrl = /^https:\/\/www\.mesalva\.com\/app\/exercicio\/[a-z0-9\-]+(\?contexto=[^&]+&lista=[^&]+&modulo=[^&]+)?$/;
    let hrefAntigo = document.location.href;

    const observador = new MutationObserver(async () => {
        if (hrefAntigo !== document.location.href) {
            hrefAntigo = document.location.href;

            if (padraoUrl.test(hrefAntigo)) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const urlResposta = construirUrl(hrefAntigo);
                console.log(`${urlResposta}`);

                try {
                    const respostaPrevia = await fetch(urlResposta, {
                        method: "GET",
                    });

                    if (!respostaPrevia.ok) {
                        alert('Erro ao tentar buscar a resposta');
                        return;
                    }

                    const respostaJson = await respostaPrevia.json();
                    const listaRespostas = respostaJson.pageProps.content.children[0].list;
                    const respostaCorreta = listaRespostas.find(resposta => resposta.isCorrect === true);

                    if (respostaCorreta) {
                        console.log(`[DEBUG] -- ${JSON.stringify(respostaCorreta)} --`);
                        const botoesRespostas = document.querySelectorAll('.exercise-answer__button');
                        let clicado = false;

                        botoesRespostas.forEach(botao => {
                            const letraElemento = botao.querySelector('.exercise-answer__letter');
                            if (letraElemento && letraElemento.textContent.trim() === respostaCorreta.letter) {
                                botao.click();
                                clicado = true;
                            }
                        });

                        if (clicado) {
                            const botaoSubmeter = document.querySelector('.btn.btn--primary.btn--size-md.submit-button');
                            if (botaoSubmeter) {
                                botaoSubmeter.click();

                                await new Promise(resolve => setTimeout(resolve, 1000));

                                const botaoProximo = document.querySelector('.btn.btn--primary.btn--size-md');
                                if (botaoProximo) {
                                    botaoProximo.click();
                                }
                            }
                        }
                    } else {
                        console.log("Resposta não encontrada.");
                    }
                } catch (error) {
                    console.error('Erro ao buscar resposta:', error);
                }
            }
        }
    });

    observador.observe(document.body, {
        childList: true,
        subtree: true
    });
})();