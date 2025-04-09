// Criando objeto global para garantir acesso
window.skillsData = {
    frontend: {
        title: "Desenvolvimento Front-end",
        description: "Criação de interfaces modernas, responsivas e acessíveis com foco na experiência do usuário",
        image: "assets/img/paginas_web.webp",
        skills: [
            { name: "HTML5", level: 90 },
            { name: "CSS3 & Flexbox/Grid", level: 85 },
            { name: "JavaScript ES6+", level: 80 }
        ],
        tags: ["Responsive Design", "UI/UX", "Sass/SCSS", "Bootstrap"]
    },
    web: {
        title: "Aplicações Web",
        description: "Desenvolvimento de aplicações web interativas com frameworks modernos e APIs",
        image: "assets/img/abas_web.webp",
        skills: [
            { name: "React.js", level: 65 },
            { name: "API Integration", level: 70 },
            { name: "Node.js", level: 70 }
        ],
        tags: ["RESTful APIs", "SPA", "Express"]
    },
    backend: {
        title: "Desenvolvimento Backend",
        description: "Criação de APIs robustas, integração com bancos de dados e gerenciamento de servidores",
        image: "assets/img/programacao_web.webp", 
        skills: [
            { name: "Java & Spring", level: 80 },
            { name: "Python", level: 85 },
            { name: "SQL/NoSQL", level: 60 }
        ],
        tags: ["C/C++", "Spring Boot", "MySQL", "MongoDB"]
    },
    devops: {
        title: "DevOps & Ferramentas",
        description: "Automação de processos, versionamento de código e integração/entrega contínua",
        image: "assets/img/DevOps.png",
        skills: [
            { name: "Git/GitHub", level: 85 },
            { name: "CI/CD", level: 65 },
            { name: "Clean Code", level: 80 }
        ],
        tags: ["VS Code", "IntelliJ IDEA", "Scrum", "Postman", "Docker"]
    }
};

console.log("✅ Dados de habilidades carregados!");