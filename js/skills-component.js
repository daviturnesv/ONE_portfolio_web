// Componente de habilidades com React
console.log("📌 Inicializando componente de habilidades...");

// Verificação imediata das dependências
if (!window.React) {
    console.error("❌ React não está disponível!");
    document.getElementById('skills-debug').innerHTML = '<h3>Erro de Carregamento</h3><p>A biblioteca React não foi carregada corretamente</p>';
    document.getElementById('skills-debug').style.display = 'block';
}

if (!window.ReactDOM) {
    console.error("❌ ReactDOM não está disponível!");
    document.getElementById('skills-debug').innerHTML = '<h3>Erro de Carregamento</h3><p>A biblioteca ReactDOM não foi carregada corretamente</p>';
    document.getElementById('skills-debug').style.display = 'block';
}

// Função para criar o componente de habilidades com uma abordagem mais robusta
function renderSkillsComponent() {
    // Referência ao elemento raiz
    const skillsRoot = document.getElementById("skills-root");
    
    if (!skillsRoot) {
        console.error("❌ Elemento #skills-root não encontrado!");
        return;
    }
    
    // Verificar novamente se as bibliotecas necessárias estão disponíveis
    if (!window.React || !window.ReactDOM) {
        console.error("❌ React ou ReactDOM não estão disponíveis no momento da renderização!");
        return;
    }
    
    // Verificar os dados de habilidades
    if (!window.skillsData) {
        console.error("❌ Dados de habilidades não disponíveis!");
        document.getElementById('skills-debug').innerHTML = '<h3>Erro de Dados</h3><p>Os dados de habilidades não foram carregados</p>';
        document.getElementById('skills-debug').style.display = 'block';
        return;
    }
    
    try {
        // Componentes em variáveis para evitar problemas com o escopo do Babel
        const React = window.React;
        const { createElement } = React;
        
        // Componente para exibir uma habilidade específica com barra de progresso
        function SkillItem(props) {
            return createElement('div', { className: 'progress-item' },
                createElement('span', { className: 'skill-name' }, props.name),
                createElement('div', { className: 'progress-bar' },
                    createElement('div', { 
                        className: 'progress', 
                        style: { width: `${props.level}%` },
                        'data-width': `${props.level}%`
                    })
                )
            );
        }
        
        // Componente para um card de categoria de habilidades
        function SkillCard(props) {
            // Criar elementos para cada habilidade
            const skillElements = props.skills.map((skill, index) =>
                createElement(SkillItem, { 
                    key: index, 
                    name: skill.name, 
                    level: skill.level 
                })
            );
            
            // Criar elementos para cada tag
            const tagElements = props.tags.map((tag, index) =>
                createElement('span', { key: index }, tag)
            );
            
            // Header do card com imagem e título
            const cardHeader = createElement('div', { className: 'skill-card-header' },
                createElement('img', { src: props.image, alt: props.title }),
                createElement('h3', null, props.title)
            );
            
            // Retornar o card completo com data-aos-delay personalizado
            return createElement('div', { 
                className: 'skill-card',
                'data-aos': 'fade-up', 
                'data-aos-delay': props.delay || 0,
                'data-tilt': true, // Habilitar efeito tilt
                'data-tilt-glare': true,
                'data-tilt-max-glare': 0.1,
                'data-tilt-max': 5
            },
                cardHeader,
                createElement('p', null, props.description),
                createElement('div', { className: 'skill-progress' }, ...skillElements),
                createElement('div', { className: 'skill-tags' }, ...tagElements)
            );
        }
        
        // Componente principal que renderiza todos os cards de habilidades
        function SkillsComponent() {
            const cards = Object.keys(window.skillsData).map((key, index) => {
                const data = window.skillsData[key];
                return createElement(SkillCard, {
                    key: key,
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    skills: data.skills,
                    tags: data.tags,
                    delay: index * 100 // Atraso gradual para cada card
                });
            });
            
            return createElement('div', { className: 'skills-container' },
                createElement('div', { className: 'skills-grid' }, ...cards)
            );
        }
        
        // Detectar a versão do React e usar o método apropriado
        if (typeof ReactDOM.createRoot === 'function') {
            // React 18+
            try {
                const root = ReactDOM.createRoot(skillsRoot);
                root.render(createElement(SkillsComponent));
                console.log("✅ Componente de habilidades renderizado com sucesso (React 18+)");
            } catch (err) {
                console.error("❌ Erro ao renderizar com createRoot:", err);
                // Fallback para o método tradicional
                ReactDOM.render(createElement(SkillsComponent), skillsRoot);
                console.log("✅ Componente de habilidades renderizado com método alternativo");
            }
        } else {
            // React 17 ou anterior
            ReactDOM.render(createElement(SkillsComponent), skillsRoot);
            console.log("✅ Componente de habilidades renderizado com sucesso (React <18)");
        }
        
        // Adicionar uma classe para indicar renderização bem-sucedida
        skillsRoot.classList.add('skills-loaded');

        // Inicializar efeito de inclinação nos cards de habilidades
        setTimeout(() => {
            if (window.VanillaTilt && document.querySelectorAll('.skill-card').length > 0) {
                VanillaTilt.init(document.querySelectorAll('.skill-card'), {
                    max: 5,
                    speed: 300,
                    glare: true,
                    "max-glare": 0.1
                });
                console.log("✨ Efeitos de inclinação aplicados aos cards de habilidades");
            }
        }, 100);
        
    } catch (error) {
        console.error("❌ Erro ao renderizar o componente de habilidades:", error);
        document.getElementById('skills-debug').innerHTML = 
            '<h3>Erro na Renderização</h3>' +
            '<p>Ocorreu um erro ao renderizar as habilidades:</p>' +
            `<pre>${error.message}</pre>`;
        document.getElementById('skills-debug').style.display = 'block';
    }
}

// Garantir que o DOM esteja carregado e as dependências estejam disponíveis
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Aguardar um pouco mais para garantir que todas as dependências estejam carregadas
        setTimeout(renderSkillsComponent, 500);
    });
} else {
    // Se o DOM já estiver carregado, aguardar um pouco para garantir que as dependências estejam disponíveis
    setTimeout(renderSkillsComponent, 500);
}