const perguntas=[
{fase:"FASE 1 DE 3",titulo:"Desafio da Senha Forte",icone:"🔐",p:"Qual destas opções é a melhor escolha para uma senha?",d:"Pense em comprimento, imprevisibilidade e se a senha é única.",pts:10,a:[["12345678",0,"Sequências simples são fáceis de adivinhar."],["Nome2007",0,"Nomes e datas pessoais podem ser descobertos."],["senha123",0,"Palavras comuns com números óbvios são fracas."],["Uma frase-senha longa, única e difícil de adivinhar",1,"Correto! Prefira senhas longas e únicas."]]},
{fase:"FASE 1 DE 3",titulo:"Desafio da Senha Forte",icone:"🔐",p:"Qual atitude ajuda mais a proteger suas contas?",d:"Escolha a prática recomendada.",pts:5,a:[["Usar a mesma senha em todos os sites",0,"Se uma senha for exposta, outras contas também ficam em risco."],["Usar uma senha diferente para cada conta",1,"Correto! Senhas únicas reduzem o impacto de uma senha exposta."],["Anotar a senha em local público",0,"Nunca compartilhe senhas em locais públicos."],["Usar apenas o próprio nome",0,"Informações pessoais são fáceis de adivinhar."]]},
{fase:"FASE 2 DE 3",titulo:"Missão 2FA",icone:"🛡️",p:"O que é autenticação em dois fatores (2FA)?",d:"Ela adiciona uma segunda forma de verificar sua identidade.",pts:10,a:[["Usar duas senhas iguais",0,"2FA não significa repetir a senha."],["Adicionar uma segunda forma de confirmar sua identidade",1,"Correto! Pode ser um código, aplicativo autenticador ou chave de segurança."],["Trocar a senha duas vezes por dia",0,"Isso não é o significado de 2FA."],["Compartilhar o código com um atendente",0,"Códigos de verificação são privados."]]},
{fase:"FASE 2 DE 3",titulo:"Missão 2FA",icone:"🛡️",p:"Você recebeu um código de login, mas não tentou entrar na conta. O que deve fazer?",d:"Pense no que pode significar receber um código inesperado.",pts:5,a:[["Enviar o código para quem entrar em contato",0,"Nunca compartilhe códigos."],["Não compartilhar o código e verificar a conta pelo canal oficial",1,"Boa! Pode ser uma tentativa de acesso."],["Publicar o código nas redes sociais",0,"Códigos são informações privadas."],["Clicar em qualquer link recebido por SMS",0,"Evite links inesperados."]]},
{fase:"FASE 3 DE 3",titulo:"Caça ao Phishing",icone:"🎣",p:"Você recebeu: 'URGENTE! Sua conta será bloqueada em 2 horas. Confirme seus dados agora pelo link.' Isso parece seguro ou suspeito?",d:"Observe a urgência, o pedido de dados e o link.",pts:10,a:[["Segura",0,"Urgência e ameaça são táticas comuns de golpes."],["Suspeita: verificar pelo aplicativo ou site oficial",1,"Correto! Não clique no link e confirme por um canal oficial."]]},
{fase:"FASE 3 DE 3",titulo:"Caça ao Phishing",icone:"🎣",p:"Qual é um sinal comum de phishing?",d:"Phishing tenta enganar alguém para obter dados ou induzir uma ação perigosa.",pts:10,a:[["Mensagem inesperada que exige ação imediata e pede dados por um link",1,"Isso mesmo! Pressão, links inesperados e pedidos de informação são sinais de alerta."],["Você abriu o aplicativo oficial",0,"Acessar o canal oficial é uma prática mais segura."],["Você usa uma senha diferente em cada conta",0,"Senhas únicas são uma boa prática."],["Você ativou o 2FA",0,"O 2FA é uma camada de proteção."]]}
];

let atual=0,pontos=0,acertos=0,respondeu=false;
const $=id=>document.getElementById(id);

function iniciar(){
 atual=0;pontos=0;acertos=0;
 $("inicio").classList.add("escondido");
 $("resultado").classList.add("escondido");
 $("quiz").classList.remove("escondido");
 $("dicas").classList.add("escondido");
 $("pontos").textContent=0;
 mostrarPergunta();
 window.scrollTo({top:0,behavior:"smooth"});
}
function mostrarPergunta(){
 const q=perguntas[atual]; respondeu=false;
 $("fase").textContent=q.fase;
 $("titulo-fase").textContent=q.titulo;
 $("icone").textContent=q.icone;
 $("contador").textContent=`Pergunta ${atual+1} de ${perguntas.length}`;
 $("pergunta").textContent=q.p;
 $("explicacao").textContent=q.d;
 $("progresso").style.width=`${(atual/perguntas.length)*100}%`;
 $("feedback").className="feedback escondido";
 $("proxima").disabled=true;
 $("proxima").textContent=atual===perguntas.length-1?"Ver resultado 🏆":"Próxima pergunta →";
 const area=$("alternativas");area.innerHTML="";
 q.a.forEach((item,i)=>{
   const b=document.createElement("button");
   b.className="alternativa";
   b.textContent=String.fromCharCode(65+i)+") "+item[0];
   b.onclick=()=>responder(b,item,q);
   area.appendChild(b);
 });
}
function responder(botao,item,q){
 if(respondeu)return;respondeu=true;
 document.querySelectorAll(".alternativa").forEach(b=>b.disabled=true);
 const botoes=[...document.querySelectorAll(".alternativa")];
 const indice=q.a.findIndex(x=>x[1]===1);
 botoes[indice].classList.add("correta");
 if(item[1]){
   botao.classList.add("correta");pontos+=q.pts;acertos++;
   $("feedback").className="feedback bom";
   $("feedback").textContent="✅ Resposta correta! "+item[2];
 }else{
   botao.classList.add("errada");
   $("feedback").className="feedback ruim";
   $("feedback").textContent="💡 "+item[2]+" "+q.a[indice][2];
 }
 $("feedback").classList.remove("escondido");
 $("pontos").textContent=pontos;
 $("proxima").disabled=false;
 $("progresso").style.width=`${((atual+1)/perguntas.length)*100}%`;
}
function proxima(){
 if(!respondeu)return;
 if(atual<perguntas.length-1){atual++;mostrarPergunta()}
 else mostrarResultado();
}
function mostrarResultado(){
 $("quiz").classList.add("escondido");$("resultado").classList.remove("escondido");
 $("pontuacaoFinal").textContent=pontos;
 $("barraFinal").style.width=`${(pontos/50)*100}%`;
 $("resumo").textContent=`Você acertou ${acertos} de ${perguntas.length} perguntas e conquistou ${pontos} pontos.`;
 if(pontos<=20){
   $("medalha").textContent="🔴";$("resultadoTitulo").textContent="Usuário em Treinamento";
   $("resultadoTexto").textContent="Você deu o primeiro passo. Revise as dicas e tente novamente!";
 }else if(pontos<=35){
   $("medalha").textContent="🟡";$("resultadoTitulo").textContent="Usuário Atento";
   $("resultadoTexto").textContent="Você já conhece algumas práticas de segurança. Continue treinando!";
 }else{
   $("medalha").textContent="🟢";$("resultadoTitulo").textContent="Guardião Digital!";
   $("resultadoTexto").textContent="Parabéns! Você demonstrou bons conhecimentos de segurança digital.";
 }
 window.scrollTo({top:0,behavior:"smooth"});
}
function voltarInicio(){
 $("quiz").classList.add("escondido");$("inicio").classList.remove("escondido");$("dicas").classList.remove("escondido");
 window.scrollTo({top:0,behavior:"smooth"});
}
function mostrarDicas(){
 $("resultado").classList.add("escondido");$("dicas").classList.remove("escondido");
 $("dicas").scrollIntoView({behavior:"smooth"});
}