/**
 * Componente de Habilidades Técnicas
 * Renderiza os cards de habilidades usando React
 */

// Garantir que o DOM esteja carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se as dependências estão carregadas
    if (!window.React || !window.ReactDOM) {
        console.error("React ou ReactDOM não estão disponíveis. Tentando carregar novamente em 500ms...");
        setTimeout(checkAndLoadDependencies, 500);
        return;
    }
    
    // Verificar se os dados de habilidades estão disponíveis
    if (!window.skillsData) {
        console.error("Dados de habilidades não estão disponíveis. Tentando carregar novamente em 500ms...");
        setTimeout(checkAndLoadDependencies, 500);
        return;
    }
    
    // Se tudo estiver pronto, inicializar o componente
    renderSkillsComponent();
});

// Função para verificar e carregar dependências
function checkAndLoadDependencies() {
    if (!window.React || !window.ReactDOM || !window.skillsData) {
        console.error("Dependências ainda não estão disponíveis. Verificando estado do documento...");
        
        // Mostrar elemento de debug se estiver tendo problemas
        const debugElement = document.getElementById('skills-debug');
        if (debugElement) {
            debugElement.style.display = 'block';
            debugElement.innerHTML = '<h3>Carregando Dependências</h3><p>Aguardando carregamento das dependências React. Se esta mensagem persistir, pode haver um problema com a conexão à internet ou com os servidores CDN.</p>';
        }
        
        // Tentar novamente em 1 segundo
        setTimeout(checkAndLoadDependencies, 1000);
        return;
    }
    
    // Se as dependências foram carregadas, renderizar o componente
    renderSkillsComponent();
}

// Função principal para renderizar o componente de habilidades
function renderSkillsComponent() {
    const skillsRoot = document.getElementById('skills-root');
    
    if (!skillsRoot) {
        console.error("Elemento #skills-root não encontrado!");
        return;
    }
    
    try {
        const { createElement } = window.React;
        
        // Componente de Item de Habilidade
        function SkillItem({ name, level }) {
            return createElement('div', { className: 'skill-item' },
                createElement('span', { className: 'skill-name' }, name),
                createElement('div', { className: 'skill-progress' },
                    createElement('div', { 
                        className: 'skill-bar', 
                        style: { width: `${level}%` } 
                    })
                )
            );
        }
        
        // Componente de Card de Habilidade
        function SkillCard({ title, description, image, skills, tags }) {
            const skillElements = skills.map((skill, index) =>
                createElement(SkillItem, { 
                    key: index, 
                    name: skill.name, 
                    level: skill.level 
                })
            );
            
            const tagElements = tags.map((tag, index) =>
                createElement('span', { key: index, className: 'skill-tag' }, tag)
            );
            
            return createElement('div', { className: 'skill-card' },
                createElement('div', { className: 'skill-card-header' },
                    createElement('img', { src: image, alt: title }),
                    createElement('h3', null, title)
                ),
                createElement('p', { className: 'skill-description' }, description),
                createElement('div', { className: 'skill-items' }, skillElements),
                createElement('div', { className: 'skill-tags' }, tagElements)
            );
        }
        
        // Componente principal
        function SkillsComponent() {
            const cards = [];
            
            // Criar cards baseados nos dados disponíveis
            for (const key in window.skillsData) {
                if (window.skillsData.hasOwnProperty(key)) {
                    const data = window.skillsData[key];
                    cards.push(
                        createElement(SkillCard, {
                            key: key,
                            title: data.title,
                            description: data.description,
                            image: data.image || 'assets/img/skill-default.png',
                            skills: data.skills || [],
                            tags: data.tags || []
                        })
                    );
                }
            }
            
            return createElement('div', { className: 'skills-container' }, ...cards);
        }
        
        // Renderizar usando a versão apropriada do ReactDOM
        if (typeof window.ReactDOM.createRoot === 'function') {
            // React 18+
            const root = window.ReactDOM.createRoot(skillsRoot);
            root.render(createElement(SkillsComponent));
        } else {
            // React 17 ou anterior
            window.ReactDOM.render(createElement(SkillsComponent), skillsRoot);
        }
        
        console.log("✅ Componente de habilidades renderizado com sucesso!");
        
        // Adicionar classes para estilos específicos após renderização
        setTimeout(() => {
            document.querySelectorAll('.skill-card').forEach(card => {
                card.classList.add('skill-card-loaded');
            });
        }, 300);
        
    } catch (error) {
        console.error("❌ Erro ao renderizar componente de habilidades:", error);
        document.getElementById('skills-debug').style.display = 'block';
        document.getElementById('skills-debug').innerHTML = 
            `<h3>Erro de Renderização</h3>
             <p>Ocorreu um erro ao renderizar o componente de habilidades:</p>
             <pre>${error.message}</pre>`;
    }
}