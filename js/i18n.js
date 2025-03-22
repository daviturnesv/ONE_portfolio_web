/**
 * Internationalization Script
 * Handles language switching and translation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize translations object
    const translations = {
        // Navegação
        'nav_home': {
            'pt': 'Home',
            'en': 'Home'
        },
        'nav_about': {
            'pt': 'Sobre',
            'en': 'About'
        },
        'nav_skills': {
            'pt': 'Habilidades',
            'en': 'Skills'
        },
        'nav_projects': {
            'pt': 'Projetos',
            'en': 'Projects'
        },
        'nav_contact': {
            'pt': 'Contato',
            'en': 'Contact'
        },
        'nav_certificates': {
            'pt': 'Certificados',
            'en': 'Certificates'
        },

        // Hero Section
        'hero_title': {
            'pt': 'Eleve seu negócio digital a outro nível <strong>com um Front-end de qualidade!</strong>',
            'en': 'Take your digital business to the next level <strong>with quality Front-end development!</strong>'
        },
        'hero_subtitle': {
            'pt': 'Desenvolvimento web com enfoque em experiência de usuário',
            'en': 'Web development with a focus on user experience (and occasionally debugging until 3AM)'
        },
        'hero_btn_talk': {
            'pt': 'Vamos conversar',
            'en': "Let's talk"
        },
        'hero_btn_projects': {
            'pt': 'Ver projetos',
            'en': 'View projects'
        },
        'hero_btn_cv': {
            'pt': 'Baixar CV',
            'en': 'Download CV'
        },

        // About Section
        'about_title': {
            'pt': 'Sobre mim',
            'en': 'About me'
        },
        'about_text_1': {
            'pt': 'Olá! Sou <strong>Davi Turnes Vieira</strong>, desenvolvedor apaixonado por transformar ideias em código. Minha jornada na programação começou com Java e desde então venho explorando todo o ecossistema web, de <strong>React e Next.js</strong> no front-end até <strong>Spring Boot e Node.js</strong> no back-end. Estou sempre entre um curso e um projeto pessoal, acreditando que aprender é tão importante quanto construir.',
            'en': 'Hi there! I\'m <strong>Davi Turnes Vieira</strong>, a developer passionate about turning ideas into code. My programming journey started with Java, and I\'ve since been exploring the entire web ecosystem, from <strong>React and Next.js</strong> in the front-end to <strong>Spring Boot and Node.js</strong> in the back-end. You\'ll usually find me somewhere between taking a course and building a personal project, as I believe learning is just as important as building.'
        },
        'about_text_2': {
            'pt': 'O que me move é criar soluções que facilitam a vida das pessoas através de interfaces intuitivas e experiências memoráveis. Adoro o desafio de equilibrar código limpo com design agradável, e acredito que a melhor tecnologia é aquela que resolve problemas reais. E sim, eu converso com meu código quando ele não funciona—surpreendentemente eficaz!',
            'en': 'What drives me is creating solutions that make people\'s lives easier through intuitive interfaces and memorable experiences. I love the challenge of balancing clean code with pleasant design, and I believe the best technology is the one that solves real problems. And yes, I do talk to my code when it doesn\'t work—it\'s surprisingly effective!'
        },

        // Stats Section
        'stats_experience': {
            'pt': 'Anos de Experiência',
            'en': 'Years of Experience'
        },
        'stats_projects': {
            'pt': 'Projetos Completos',
            'en': 'Completed Projects'
        },
        'stats_commits': {
            'pt': 'Commits no GitHub',
            'en': 'GitHub Commits'
        },

        // Competencies Section
        'competencies_title': {
            'pt': 'Competências',
            'en': 'Competencies'
        },
        'competencies_frontend': {
            'pt': 'Desenvolvimento Frontend',
            'en': 'Frontend Development'
        },
        'competencies_backend': {
            'pt': 'Desenvolvimento Backend',
            'en': 'Backend Development'
        },
        'competencies_tools': {
            'pt': 'Ferramentas e Metodologias',
            'en': 'Tools & Methodologies'
        },

        // Skills Section
        'skills_title': {
            'pt': 'Habilidades',
            'en': 'Skills'
        },
        'skills_frontend_title': {
            'pt': 'Desenvolvimento Front-end',
            'en': 'Front-end Development'
        },
        'skills_frontend_desc': {
            'pt': 'Criação de interfaces modernas e responsivas usando HTML, CSS e JavaScript',
            'en': 'Creating modern and responsive interfaces using HTML, CSS and JavaScript'
        },
        'skills_web_title': {
            'pt': 'Aplicações Web',
            'en': 'Web Applications'
        },
        'skills_web_desc': {
            'pt': 'Desenvolvimento de aplicações web interativas e dinâmicas',
            'en': 'Development of interactive and dynamic web applications'
        },
        'skills_advanced_title': {
            'pt': 'Programação Avançada',
            'en': 'Advanced Programming'
        },
        'skills_advanced_desc': {
            'pt': 'Desenvolvimento de soluções usando linguagens modernas',
            'en': 'Developing solutions using modern languages (and ancient debugging techniques)'
        },
        'skills_devops_title': {
            'pt': 'DevOps & Ferramentas',
            'en': 'DevOps & Tools'
        },
        'skills_devops_desc': {
            'pt': 'Automação de processos, versionamento de código e integração/entrega contínua',
            'en': 'Process automation, code versioning and continuous integration/delivery'
        },

        // Projects Section
        'projects_title': {
            'pt': 'Projetos',
            'en': 'Projects'
        },
        'filter_all': {
            'pt': 'Todos',
            'en': 'All'
        },
        'filter_web': {
            'pt': 'Web',
            'en': 'Web'
        },
        'filter_java': {
            'pt': 'Java',
            'en': 'Java'
        },
        'filter_other': {
            'pt': 'Outros',
            'en': 'Others'
        },
        'project_secret_number_title': {
            'pt': 'Jogo do Número Secreto',
            'en': 'Secret Number Game'
        },
        'project_secret_number_desc': {
            'pt': 'Aplicação web interativa onde o usuário precisa adivinhar um número aleatório através de dicas e tentativas.',
            'en': 'Interactive web application where users must guess a random number through hints and attempts.'
        },
        'project_secret_friend_title': {
            'pt': 'Sorteio de Amigo Secreto',
            'en': 'Secret Santa Draw'
        },
        'project_secret_friend_desc': {
            'pt': 'Sistema para organização de amigos secretos com cadastro de participantes, validação de dados e sorteio automático que evita duplicações.',
            'en': 'System for organizing Secret Santa with participant registration, data validation, and automated drawing that prevents duplications.'
        },
        'project_ourtube_title': {
            'pt': 'OurTube',
            'en': 'OurTube'
        },
        'project_ourtube_desc': {
            'pt': 'Aplicativo Python para download de vídeos e áudios do YouTube com interface gráfica e modo linha de comando, oferecendo seleção de qualidade, download de playlists, extração de MP3, incorporação de miniaturas e organização automática de arquivos. Utiliza yt-dlp e FFmpeg para processamento de mídia, com instalação simplificada através de script automatizado.',
            'en': 'Python application for downloading YouTube videos and audio with both GUI and command-line interfaces, offering quality selection, playlist downloads, MP3 extraction, thumbnail embedding, and automatic file organization. Uses yt-dlp and FFmpeg for media processing, with simplified installation through automated script.'
        },
        'project_planner_title': {
            'pt': 'Plann.er',
            'en': 'Plann.er'
        },
        'project_planner_desc': {
            'pt': 'Aplicação Java com Spring Boot para organizar viagens. Permite criar viagens, adicionar atividades e links, convidar participantes via e-mail e gerenciar confirmações, utilizando JPA, H2 Database, Flyway, Lombok e Dev Tools.',
            'en': 'Java application with Spring Boot for organizing trips. Allows creating trips, adding activities and links, inviting participants via email, and managing confirmations, using JPA, H2 Database, Flyway, Lombok, and Dev Tools.'
        },
        'project_todo_title': {
            'pt': 'To-do List',
            'en': 'To-do List'
        },
        'project_todo_desc': {
            'pt': 'Sistema de gerenciamento de tarefas completo com funcionalidades de criação, edição, exclusão e marcação de tarefas concluídas. Desenvolvida com Spring Boot, utilizando Spring Data JPA para persistência de dados, Jakarta Servlet para manipulação de requisições HTTP, BCrypt para hashing de senhas e Lombok para simplificação do código.',
            'en': 'Complete task management system with features for creating, editing, deleting, and marking tasks as completed. Developed with Spring Boot, using Spring Data JPA for data persistence, Jakarta Servlet for HTTP request handling, BCrypt for password hashing, and Lombok for code simplification.'
        },
        'project_btn_code': {
            'pt': 'Ver Código',
            'en': 'View Code'
        },

        // Contact Section
        'contact_title': {
            'pt': 'Entre em contato',
            'en': 'Contact me'
        },
        'contact_subtitle': {
            'pt': 'Vamos trabalhar juntos no seu próximo projeto',
            'en': 'Let\'s work together on your next project'
        },
        'contact_card_title': {
            'pt': 'Vamos criar algo incrível juntos',
            'en': 'Let\'s create something amazing together'
        },
        'contact_card_text': {
            'pt': 'Estou disponível para projetos freelance, trabalho em equipe ou conversas sobre tecnologia.',
            'en': 'I\'m available for freelance projects, teamwork, or discussions about technology. I promise my code is better than my coffee jokes, which are mostly grounds for dismissal.'
        },
        'contact_email': {
            'pt': 'Email',
            'en': 'Email'
        },
        'contact_phone': {
            'pt': 'Telefone',
            'en': 'Phone'
        },
        'contact_location': {
            'pt': 'Localização',
            'en': 'Location'
        },
        'contact_location_value': {
            'pt': 'Florianópolis, Santa Catarina',
            'en': 'Florianópolis, Santa Catarina, Brazil'
        },
        'contact_social': {
            'pt': 'Me encontre nas redes',
            'en': 'Find me on social media'
        },
        'form_title': {
            'pt': 'Envie uma mensagem',
            'en': 'Send a message'
        },
        'form_name': {
            'pt': 'Nome',
            'en': 'Name'
        },
        'form_name_placeholder': {
            'pt': 'Seu nome completo',
            'en': 'Your full name'
        },
        'form_email': {
            'pt': 'Email',
            'en': 'Email'
        },
        'form_email_placeholder': {
            'pt': 'seu.email@exemplo.com',
            'en': 'your.email@example.com'
        },
        'form_subject': {
            'pt': 'Assunto',
            'en': 'Subject'
        },
        'form_subject_placeholder': {
            'pt': 'Sobre o que você quer conversar?',
            'en': 'What would you like to discuss?'
        },
        'form_message': {
            'pt': 'Mensagem',
            'en': 'Message'
        },
        'form_message_placeholder': {
            'pt': 'Digite sua mensagem aqui...',
            'en': 'Type your message here...'
        },
        'form_submit': {
            'pt': 'Enviar mensagem',
            'en': 'Send message'
        },
        'form_success': {
            'pt': 'Mensagem enviada com sucesso! Obrigado pelo contato.',
            'en': 'Message sent successfully! Thank you for contacting me.'
        },
        'form_error': {
            'pt': 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.',
            'en': 'An error occurred while sending the message. Please try again.'
        },

        // Footer
        'footer_text': {
            'pt': '&copy; 2025 Davi Turnes Vieira | Desenvolvedor Front-end',
            'en': '&copy; 2025 Davi Turnes Vieira | Front-end Developer'
        },

        // Modal
        'modal_tech': {
            'pt': 'Tecnologias:',
            'en': 'Technologies:'
        },
        'modal_github': {
            'pt': 'Ver no GitHub',
            'en': 'View on GitHub'
        },

        // Certificate Section
        'certificates_title': {
            'pt': 'Certificados',
            'en': 'Certificates'
        },
        'certificates_subtitle': {
            'pt': 'Minha jornada de aprendizado e desenvolvimento profissional',
            'en': 'My learning journey and professional development'
        },
        'filter_all': {
            'pt': 'Todos',
            'en': 'All'
        },
        'filter_frontend': {
            'pt': 'Front-End',
            'en': 'Front-End'
        },
        'filter_backend': {
            'pt': 'Back-End',
            'en': 'Back-End'
        },
        'filter_programming_fundamentals': {
            'pt': 'Fundamentos',
            'en': 'Fundamentals'
        },
        'filter_tools_ai': {
            'pt': 'Ferramentas & IA',
            'en': 'Tools & AI'
        },
        'filter_dev_personal': {
            'pt': 'Desenvolvimento Pessoal',
            'en': 'Personal Development'
        },
        'filter_marketing': {
            'pt': 'Marketing',
            'en': 'Marketing'
        },
        
        // Certificate: Aprender a aprender
        'cert_learn_to_learn_title': {
            'pt': 'Aprender a aprender: técnicas para seu autodesenvolvimento',
            'en': 'Learning to learn: techniques for self-development'
        },
        'cert_learn_to_learn_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_learn_to_learn_desc': {
            'pt': 'Dominei técnicas avançadas de aprendizado acelerado, incluindo métodos de estudo eficiente, gerenciamento de tempo e estratégias para retenção de conhecimento a longo prazo.',
            'en': 'Mastered advanced accelerated learning techniques, including efficient study methods, time management, and strategies for long-term knowledge retention.'
        },
        
        // Certificate: Foco
        'cert_focus_title': {
            'pt': 'Foco: trazendo mais resultados para o dia a dia',
            'en': 'Focus: bringing more results to everyday life'
        },
        'cert_focus_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_focus_desc': {
            'pt': 'Aprendi estratégias práticas para aumentar a produtividade através do gerenciamento eficiente da atenção, eliminação de distrações e criação de ambientes favoráveis à concentração profunda.',
            'en': 'Learned practical strategies to increase productivity through efficient attention management, elimination of distractions, and creation of environments conducive to deep concentration.'
        },
        
        // Certificate: Hábitos
        'cert_habits_title': {
            'pt': 'Hábitos: da produtividade às metas pessoais',
            'en': 'Habits: from productivity to personal goals'
        },
        'cert_habits_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_habits_desc': {
            'pt': 'Desenvolvi competências na formação de hábitos consistentes que impulsionam a produtividade e a realização de metas pessoais e profissionais, aplicando técnicas de psicologia comportamental.',
            'en': 'Developed skills in forming consistent habits that drive productivity and achievement of personal and professional goals, applying behavioral psychology techniques.'
        },
        
        // Certificate: LinkedIn
        'cert_linkedin_title': {
            'pt': 'LinkedIn: como fazer o seu perfil trabalhar para você',
            'en': 'LinkedIn: how to make your profile work for you'
        },
        'cert_linkedin_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_linkedin_desc': {
            'pt': 'Aprendi estratégias avançadas de otimização de perfil no LinkedIn para networking profissional, atração de recrutadores e desenvolvimento de marca pessoal na plataforma mais importante para conexões profissionais.',
            'en': 'Learned advanced LinkedIn profile optimization strategies for professional networking, attracting recruiters, and developing personal branding on the most important platform for professional connections.'
        },
        
        // Certificate: Java
        'cert_java_title': {
            'pt': 'Curso de Java',
            'en': 'Java Course'
        },
        'cert_java_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        'cert_java_desc': {
            'pt': 'Adquiri conhecimentos sólidos em Java, incluindo programação orientada a objetos, manipulação de coleções, tratamento de exceções e desenvolvimento de aplicações completas com Spring Framework.',
            'en': 'Acquired solid knowledge in Java, including object-oriented programming, collection handling, exception treatment, and development of complete applications with Spring Framework.'
        },
        
        // Certificate: PHP
        'cert_php_title': {
            'pt': 'Curso Online de PHP',
            'en': 'Online PHP Course'
        },
        'cert_php_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        'cert_php_desc': {
            'pt': 'Desenvolvi uma aplicação em PHP com Laravel utilizando a arquitetura MVC, integrando SQLite, migrations, factories, seeders, validações e interfaces dinâmicas com Livewire.',
            'en': 'Developed PHP skills for creating dynamic web applications, database manipulation, object-oriented programming, and integration with HTML/CSS.'
        },
        
        // Certificate: ChatGPT
        'cert_chatgpt_title': {
            'pt': 'ChatGPT: otimizando a qualidade dos resultados',
            'en': 'ChatGPT: optimizing the quality of results'
        },
        'cert_chatgpt_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_chatgpt_desc': {
            'pt': 'Aprendi técnicas avançadas para criar prompts eficazes no ChatGPT, melhorando significativamente a qualidade das respostas em diversos contextos profissionais e criativos.',
            'en': 'Learned advanced techniques to create effective prompts in ChatGPT, significantly improving the quality of responses in various professional and creative contexts.'
        },

        // Certificado HTML e CSS ambientes de desenvolvimento
        'cert_html_css_env_title': {
            'pt': 'HTML e CSS: ambientes de desenvolvimento, estrutura de arquivos e tags',
            'en': 'HTML and CSS: development environments, file structure and tags'
        },
        'cert_html_css_env_desc': {
            'pt': 'Desenvolvi habilidades em configuração de ambientes para desenvolvimento web, organização eficiente de arquivos e uso semântico de tags HTML para criação de sites acessíveis e bem estruturados.',
            'en': 'Developed skills in setting up web development environments, efficient file organization, and semantic use of HTML tags for creating accessible and well-structured websites.'
        },
        'skill_dev_environment': {
            'pt': 'Ambiente de Desenvolvimento',
            'en': 'Development environments'
        },
        'skill_semantic_html': {
            'pt': 'HTML Semântico',
            'en': 'Semantic HTML'
        },

        // Certificado HTML e CSS cabeçalho, footer e variáveis CSS
        'cert_html_css_header_footer_title': {
            'pt': 'HTML e CSS: cabeçalho, footer e variáveis CSS',
            'en': 'HTML and CSS: header, footer, and CSS variables'
        },
        'cert_html_css_header_footer_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_html_css_header_footer_desc': {
            'pt': 'Aprofundei meus conhecimentos em HTML e CSS com foco na criação de elementos estruturais como cabeçalhos e rodapés, além do uso de variáveis CSS para manutenção e escala eficientes de projetos web.',
            'en': 'Deepened my knowledge of HTML and CSS with a focus on creating structural elements such as headers and footers, as well as using CSS variables for efficient maintenance and scalability of web projects.'
        },
        'skill_css_variables': {
            'pt': 'Variáveis CSS',
            'en': 'CSS Variables'
        },
        'skill_layout': {
            'pt': 'Layouts',
            'en': 'Layouts'
        },

        // Certificado HTML e CSS: Classes, posicionamento e Flexbox
        'cert_html_css_flexbox_title': {
            'pt': 'HTML e CSS: Classes, posicionamento e Flexbox',
            'en': 'HTML and CSS: Classes, positioning, and Flexbox'
        },
        'cert_html_css_flexbox_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_html_css_flexbox_desc': {
            'pt': 'Dominei técnicas avançadas de posicionamento de elementos com CSS, incluindo a implementação do Flexbox para criação de layouts responsivos e alinhamentos complexos de forma simplificada.',
            'en': 'Mastered advanced CSS techniques for element positioning, including the implementation of Flexbox to create responsive layouts and simplified complex alignments.'
        },
        'skill_flexbox': {
            'pt': 'Flexbox',
            'en': 'Flexbox'
        },
        'skill_positioning': {
            'pt': 'Posicionamento',
            'en': 'Positioning'
        },
        'skill_css_classes': {
            'pt': 'Classes CSS',
            'en': 'CSS Classes'
        },

        // Certificado HTML e CSS: responsividade com mobile-first
        'cert_html_css_responsive_title': {
            'pt': 'HTML e CSS: responsividade com mobile-first',
            'en': 'HTML and CSS: mobile-first responsiveness'
        },
        'cert_html_css_responsive_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_html_css_responsive_desc': {
            'pt': 'Aprendi a implementar a metodologia mobile-first para desenvolvimento web responsivo, adaptando interfaces para diferentes tamanhos de tela e garantindo experiências consistentes em todos os dispositivos.',
            'en': 'Learned to implement the mobile-first methodology for responsive web development, adapting interfaces to various screen sizes and ensuring consistent experiences across all devices.'
        },
        'skill_responsive': {
            'pt': 'Design Responsivo',
            'en': 'Responsive Design'
        },
        'skill_mobile_first': {
            'pt': 'Mobile First',
            'en': 'Mobile First'
        },
        'skill_media_queries': {
            'pt': 'Media Queries',
            'en': 'Media Queries'
        },

        // Certificado PHP
        'cert_php_title': {
            'pt': 'Curso de PHP',
            'en': 'PHP Course'
        },
        'cert_php_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        'cert_php_desc': {
            'pt': 'Desenvolvi uma aplicação em PHP com Laravel utilizando a arquitetura MVC, integrando SQLite, migrations, factories, seeders, validações e interfaces dinâmicas com Livewire.',
            'en': 'Developed a PHP application using Laravel and the MVC architecture, integrating SQLite, migrations, factories, seeders, validations, and dynamic interfaces with Livewire.'
        },
        'skill_php': {
            'pt': 'PHP',
            'en': 'PHP'
        },
        'skill_laravel': {
            'pt': 'Laravel',
            'en': 'Laravel'
        },
        'skill_mvc': {
            'pt': 'MVC',
            'en': 'MVC'
        },
        'skill_sqlite': {
            'pt': 'SQLite',
            'en': 'SQLite'
        },
        'skill_migrations': {
            'pt': 'Livewire',
            'en': 'Livewire'
        },

        // Certificado Minicurso de Java
        'cert_minijava_title': {
            'pt': 'Minicurso de Java',
            'en': 'Java Mini-course'
        },
        'cert_minicurso_java_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        'cert_minijava_desc': {
            'pt': 'Desenvolvi uma aplicação back-end em Java utilizando Maven, SpringBoot, API Rest e Lombok, integrando H2 Database, com implementação de segurança, tratamento de exceções e deploy.',
            'en': 'Developed a back-end application in Java using Maven, SpringBoot, REST API, and Lombok, integrating H2 Database with security implementation, exception handling, and deployment.'
        },
        'skill_java': {
            'pt': 'Java',
            'en': 'Java'
        },
        'skill_maven': {
            'pt': 'Maven',
            'en': 'Maven'
        },
        'skill_springboot': {
            'pt': 'SpringBoot',
            'en': 'SpringBoot'
        },
        'skill_apirest': {
            'pt': 'API Rest',
            'en': 'REST API'
        },
        'skill_lombok': {
            'pt': 'Lombok',
            'en': 'Lombok'
        },
        'skill_h2data': {
            'pt': 'H2 Database',
            'en': 'H2 Database'
        },

        // Certificado NLW Connect - C#
        'cert_nlwconnect_csharp_title': {
            'pt': 'NLW Connect - C#',
            'en': 'NLW Connect - C#'
        },
        'cert_nlwconnect_csharp_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        'cert_nlwconnect_csharp_desc': {
            'pt': 'Desenvolvi fundamentos de C# e .NET, implementando criação e autenticação de usuários com criptografia BCrypt, integração com banco de dados, tokens JWT, tratamento de exceções personalizadas, paginação e filtros.',
            'en': 'Developed fundamentals of C# and .NET, implementing user creation and authentication with BCrypt encryption, database integration, JWT tokens, custom exception handling, pagination, and filters.'
        },
        'skill_csharp': {
            'pt': 'C#',
            'en': 'C#'
        },
        'skill_dotnet': {
            'pt': '.NET',
            'en': '.NET'
        },
        'skill_bcrypt': {
            'pt': 'BCrypt',
            'en': 'BCrypt'
        },
        'skill_db': {
            'pt': 'Banco de Dados',
            'en': 'Database'
        },
        'skill_jwt': {
            'pt': 'JWT',
            'en': 'JWT'
        },
        'skill_exceptions': {
            'pt': 'Exceções',
            'en': 'Exceptions'
        },
        'skill_pagination': {
            'pt': 'Paginação',
            'en': 'Pagination'
        },
        'skill_filters': {
            'pt': 'Filtros',
            'en': 'Filters'
        },

        // Certificado NLW Connect - Fullstack
        'cert_nlwconnect_fullstack_title': {
            'pt': 'NLW Connect - Fullstack',
            'en': 'NLW Connect - Fullstack'
        },
        'cert_nlwconnect_fullstack_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        'cert_nlwconnect_fullstack_desc': {
            'pt': 'Desenvolvi uma aplicação front-end utilizando HTML, CSS e JavaScript, explorando os fundamentos da programação, criação de estrutura base com HTML, estilização com CSS e aplicação de lógica com JavaScript.',
            'en': 'Developed a front-end application using HTML, CSS, and JavaScript, exploring programming fundamentals, structuring with HTML, styling with CSS, and applying logic with JavaScript.'
        },
        'skill_html': {
            'pt': 'HTML',
            'en': 'HTML'
        },
        'skill_css': {
            'pt': 'CSS',
            'en': 'CSS'
        },
        'skill_javascript': {
            'pt': 'JavaScript',
            'en': 'JavaScript'
        },
        'skill_programming_fundamentals': {
            'pt': 'Fundamentos de Programação',
            'en': 'Programming Fundamentals'
        },

        // Certificado NLW Connect - Java
        'cert_nlwconnect_java_title': {
            'pt': 'NLW Connect - Java',
            'en': 'NLW Connect - Java'
        },
        'cert_nlwconnect_java_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        'cert_nlwconnect_java_desc': {
            'pt': 'Desenvolvi uma aplicação back-end em Java com Maven, utilizando SpringBoot e API Rest, estruturando o projeto desde a modelagem dos dados até a implementação das funcionalidades principais. Integrei MySQL com JPA e JDBC, utilizei records para manipulação de dados e implementei um sistema de indicações com ranking de usuários.',
            'en': 'Developed a back-end application in Java with Maven, using SpringBoot and API Rest, structuring the project from data modeling to implementing core functionalities. Integrated MySQL with JPA and JDBC, used records for data manipulation, and implemented a recommendation system with user ranking.'
        },
        'skill_java': {
            'pt': 'Java',
            'en': 'Java'
        },
        'skill_maven': {
            'pt': 'Maven',
            'en': 'Maven'
        },
        'skill_springboot': {
            'pt': 'SpringBoot',
            'en': 'SpringBoot'
        },
        'skill_apirest': {
            'pt': 'API Rest',
            'en': 'API Rest'
        },
        'skill_mysql': {
            'pt': 'MySQL',
            'en': 'MySQL'
        },
        'skill_jpa': {
            'pt': 'JPA',
            'en': 'JPA'
        },
        'skill_jdbc': {
            'pt': 'JDBC',
            'en': 'JDBC'
        },
        'skill_records': {
            'pt': 'Records',
            'en': 'Records'
        },

        // Certificate: NLW Connect - Node.js
        'cert_nlwconnect_nodejs_desc': {
            'pt': 'Desenvolvi uma aplicação back-end em Node.js aplicando conceitos de API REST, utilizando TypeScript, Fastify como framework, integração do Drizzle ORM, Docker para serviços de PostgreSQL e Redis, validação de dados com Zod e documentação com Swagger.',
            'en': 'Developed a back-end application in Node.js applying REST API concepts, using TypeScript, Fastify as a framework, Drizzle ORM integration, Docker for PostgreSQL and Redis services, data validation with Zod, and Swagger documentation.'
        },

        // Certificate: NLW Connect - Python
        'cert_nlwconnect_python_desc': {
            'pt': 'Aprendi conceitos de Python e desenvolvi APIs REST com Flask, manipulando banco de dados com SQLAlchemy e aplicando padrões de projeto com repository, interface e controller, além de validação de dados com Cerberus, padronização de requisições HTTP, criação de rotas e testes automatizados com Pytest.',
            'en': 'Learned Python concepts and developed REST APIs with Flask, handling databases with SQLAlchemy and applying design patterns with repository, interface, and controller, plus data validation with Cerberus, standardization of HTTP requests, route creation, and automated testing with Pytest.'
        },

        // Certificate: NLW Connect - React and Next.js
        'cert_nlwconnect_react_desc': {
            'pt': 'Aprendi os fundamentos do React e Next.js, aplicando o padrão de composição de componentes, estilização com Tailwind, roteamento com App Router, Server e Client Components, formulários com React Hook Form, criação de cliente HTTP com Orval, configuração de toolchain com Biome, validação com Zod e tipagem com TypeScript.',
            'en': 'Learned React and Next.js fundamentals, applying component composition patterns, styling with Tailwind, routing with App Router, Server and Client Components, forms with React Hook Form, HTTP client creation with Orval, toolchain configuration with Biome, validation with Zod, and typing with TypeScript.'
        },

        // Certificate: NLW Pocket - Javascript Full-stack Intermediate
        'cert_nlwpocket_js_desc': {
            'pt': 'Desenvolvi uma aplicação full-stack com back-end em Node.js, aplicando conceitos de API REST, TypeScript, Fastify, DrizzleORM com PostgreSQL, Docker e validação de dados com Zod. No front-end, utilizei ReactJS, explorando Propriedades, Estados e Componentes, tipagem com TypeScript, tooling com Vite, interface responsiva com TailwindCSS e gerenciamento de dados assíncronos com TanStack Query.',
            'en': 'Developed a full-stack application with Node.js backend, applying REST API concepts, TypeScript, Fastify, DrizzleORM with PostgreSQL, Docker, and Zod for data validation. On the frontend, used ReactJS, exploring Props, State, and Components, TypeScript typing, Vite tooling, responsive interface with TailwindCSS, and asynchronous data management with TanStack Query.'
        },

        // Certificate: NLW Pocket - Javascript Beginner Programming
        'cert_nlwpocket_js_beginner_desc': {
            'pt': 'Aprendi os fundamentos de JavaScript e Node.js, incluindo variáveis, operadores, tipos de dados, estruturas de controle, loops, assincronismo e criação de prompts interativos com a biblioteca Inquirer.',
            'en': 'Learned JavaScript and Node.js fundamentals, including variables, operators, data types, control structures, loops, asynchronism, and creating interactive prompts with the Inquirer library.'
        },

        // Additional skills for certificates
        'skill_fastify': {
            'pt': 'Fastify',
            'en': 'Fastify'
        },
        'skill_drizzle': {
            'pt': 'Drizzle ORM',
            'en': 'Drizzle ORM'
        },
        'skill_postgresql': {
            'pt': 'PostgreSQL',
            'en': 'PostgreSQL'
        },
        'skill_docker': {
            'pt': 'Docker',
            'en': 'Docker'
        },
        'skill_redis': {
            'pt': 'Redis',
            'en': 'Redis'
        },
        'skill_zod': {
            'pt': 'Zod',
            'en': 'Zod'
        },
        'skill_swagger': {
            'pt': 'Swagger',
            'en': 'Swagger'
        },
        'skill_python': {
            'pt': 'Python',
            'en': 'Python'
        },
        'skill_flask': {
            'pt': 'Flask',
            'en': 'Flask'
        },
        'skill_sqlalchemy': {
            'pt': 'SQLAlchemy',
            'en': 'SQLAlchemy'
        },
        'skill_cerberus': {
            'pt': 'Cerberus',
            'en': 'Cerberus'
        },
        'skill_pytest': {
            'pt': 'Pytest',
            'en': 'Pytest'
        },
        'skill_http': {
            'pt': 'HTTP',
            'en': 'HTTP'
        },
        'skill_react': {
            'pt': 'React',
            'en': 'React'
        },
        'skill_nextjs': {
            'pt': 'Next.js',
            'en': 'Next.js'
        },
        'skill_tailwind': {
            'pt': 'TailwindCSS',
            'en': 'TailwindCSS'
        },
        'skill_router': {
            'pt': 'App Router',
            'en': 'App Router'
        },
        'skill_server_components': {
            'pt': 'Server Components',
            'en': 'Server Components'
        },
        'skill_client_components': {
            'pt': 'Client Components',
            'en': 'Client Components'
        },
        'skill_react_hook_form': {
            'pt': 'React Hook Form',
            'en': 'React Hook Form'
        },
        'skill_orval': {
            'pt': 'Orval',
            'en': 'Orval'
        },
        'skill_biome': {
            'pt': 'Biome',
            'en': 'Biome'
        },
        'skill_reactjs': {
            'pt': 'ReactJS',
            'en': 'ReactJS'
        },
        'skill_vite': {
            'pt': 'Vite',
            'en': 'Vite'
        },
        'skill_tanstack': {
            'pt': 'TanStack Query',
            'en': 'TanStack Query'
        },
        'skill_typescript': {
            'pt': 'TypeScript',
            'en': 'TypeScript'
        },

        // Project filter buttons (index.html)
        'proj_filter_all': {
            'pt': 'Todos',
            'en': 'All'
        },
        'proj_filter_web': {
            'pt': 'Web',
            'en': 'Web'
        },
        'proj_filter_java': {
            'pt': 'Java',
            'en': 'Java'
        },
        'proj_filter_other': {
            'pt': 'Outros',
            'en': 'Others'
        },
        
        // Certificate filter buttons (certificates.html)
        'cert_filter_all': {
            'pt': 'Todos',
            'en': 'All'
        },
        'cert_filter_frontend': {
            'pt': 'Front-End',
            'en': 'Front-End'
        },
        'cert_filter_backend': {
            'pt': 'Back-End',
            'en': 'Back-End'
        },
        'cert_filter_programming_fundamentals': {
            'pt': 'Fundamentos',
            'en': 'Fundamentals'
        },
        'cert_filter_tools_ai': {
            'pt': 'Ferramentas & IA',
            'en': 'Tools & AI'
        },
        'cert_filter_dev_personal': {
            'pt': 'Desenvolvimento Pessoal',
            'en': 'Personal Development'
        },
        'cert_filter_marketing': {
            'pt': 'Marketing',
            'en': 'Marketing'
        },

        // Certificate: Lógica de programação: mergulhe em programação com JavaScript
        'cert_logica_mergulhe_title': {
            'pt': 'Lógica de programação: mergulhe em programação com JavaScript',
            'en': 'Programming logic: dive into JavaScript programming'
        },
        'cert_logica_mergulhe_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_logica_mergulhe_desc': {
            'pt': 'Aprendi os fundamentos da lógica de programação utilizando JavaScript, incluindo variáveis, condicionais, loops e funções, aplicando esses conceitos no desenvolvimento de algoritmos e solução de problemas.',
            'en': 'I learned the fundamentals of programming logic using JavaScript, including variables, conditionals, loops and functions, applying these concepts in algorithm development and problem solving.'
        },
        
        // Certificate: Lógica de programação: explore funções e listas
        'cert_logica_explore_title': {
            'pt': 'Lógica de programação: explore funções e listas',
            'en': 'Programming logic: exploring functions and lists'
        },
        'cert_logica_explore_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_logica_explore_desc': {
            'pt': 'Aprofundei meus conhecimentos em JavaScript com foco em funções, arrays e manipulação de listas, desenvolvendo aplicações mais complexas e reutilizáveis.',
            'en': 'I deepened my knowledge in JavaScript focusing on functions, arrays and list manipulation, developing more complex and reusable applications.'
        },
        
        // Certificate: Challenge amigo secreto
        'cert_amigo_secreto_title': {
            'pt': 'Praticando Lógica de programação: Challenge amigo secreto',
            'en': 'Practicing Programming Logic: Secret Santa Challenge'
        },
        'cert_amigo_secreto_source': {
            'pt': 'Alura',
            'en': 'Alura'
        },
        'cert_amigo_secreto_desc': {
            'pt': 'Apliquei conceitos de lógica de programação no desenvolvimento de um sistema de sorteio de amigo secreto, utilizando JavaScript para manipulação do DOM, validação de formulários e algoritmos de sorteio.',
            'en': 'Applied programming logic concepts in the development of a secret santa drawing system, using JavaScript for DOM manipulation, form validation and drawing algorithms.'
        },
        
        // Certificate: Minicurso de Java
        'cert_minicurso_java_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate: NLW Connect - Csharp
        'cert_nlwconnect_csharp_title': {
            'pt': 'NLW Connect - C#',
            'en': 'NLW Connect - C#'
        },
        'cert_nlwconnect_csharp_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate: NLW Connect - Fullstack
        'cert_nlwconnect_fullstack_title': {
            'pt': 'NLW Connect - Fullstack',
            'en': 'NLW Connect - Fullstack'
        },
        'cert_nlwconnect_fullstack_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate: NLW Connect - Java
        'cert_nlwconnect_java_title': {
            'pt': 'NLW Connect - Java',
            'en': 'NLW Connect - Java'
        },
        'cert_nlwconnect_java_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate: NLW Connect - Node.js
        'cert_nlwconnect_nodejs_title': {
            'pt': 'NLW Connect - Node.js',
            'en': 'NLW Connect - Node.js'
        },
        'cert_nlwconnect_nodejs_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate: NLW Connect - Python
        'cert_nlwconnect_python_title': {
            'pt': 'NLW Connect - Python',
            'en': 'NLW Connect - Python'
        },
        'cert_nlwconnect_python_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate: NLW Connect - React
        'cert_nlwconnect_react_title': {
            'pt': 'NLW Connect - React e Next.js',
            'en': 'NLW Connect - React and Next.js'
        },
        'cert_nlwconnect_react_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate: NLW Pocket JS Fullstack
        'cert_nlwpocket_js_title': {
            'pt': 'NLW Pocket: Javascript - Full-stack Intermediário',
            'en': 'NLW Pocket: Javascript - Intermediate Full-stack'
        },
        'cert_nlwpocket_js_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate: NLW Pocket JS Beginner
        'cert_nlwpocket_js_beginner_title': {
            'pt': 'NLW Pocket: Javascript - Programação Iniciante',
            'en': 'NLW Pocket: Javascript - Beginner Programming'
        },
        'cert_nlwpocket_js_beginner_source': {
            'pt': 'Rocketseat',
            'en': 'Rocketseat'
        },
        
        // Certificate Skills
        'skill_metacognition': {
            'pt': 'Metacognição',
            'en': 'Metacognition'
        },
        'skill_memorization': {
            'pt': 'Técnicas de Memorização',
            'en': 'Memorization Techniques'
        },
        'skill_time_management': {
            'pt': 'Gerenciamento de Tempo',
            'en': 'Time Management'
        },
        'skill_continuous_learning': {
            'pt': 'Aprendizado Contínuo',
            'en': 'Continuous Learning'
        },
        'skill_deep_work': {
            'pt': 'Deep Work',
            'en': 'Deep Work'
        },
        'skill_productivity': {
            'pt': 'Produtividade',
            'en': 'Productivity'
        },
        'skill_mindfulness': {
            'pt': 'Mindfulness',
            'en': 'Mindfulness'
        },
        'skill_habit_formation': {
            'pt': 'Formação de Hábitos',
            'en': 'Habit Formation'
        },
        'skill_behavioral_psych': {
            'pt': 'Psicologia Comportamental',
            'en': 'Behavioral Psychology'
        },
        'skill_goal_setting': {
            'pt': 'Definição de Metas',
            'en': 'Goal Setting'
        },
        'skill_self_management': {
            'pt': 'Autogestão',
            'en': 'Self-Management'
        },
        'skill_personal_branding': {
            'pt': 'Marca Pessoal',
            'en': 'Personal Branding'
        },
        'skill_networking': {
            'pt': 'Networking',
            'en': 'Networking'
        },
        'skill_social_media': {
            'pt': 'Mídias Sociais',
            'en': 'Social Media'
        },
        'skill_java': {
            'pt': 'Java',
            'en': 'Java'
        },
        'skill_oop': {
            'pt': 'POO',
            'en': 'OOP'
        },
        'skill_spring': {
            'pt': 'Spring Framework',
            'en': 'Spring Framework'
        },
        'skill_php': {
            'pt': 'PHP',
            'en': 'PHP'
        },
        'skill_web_dev': {
            'pt': 'Desenvolvimento Web',
            'en': 'Web Development'
        },
        'skill_databases': {
            'pt': 'Bancos de Dados',
            'en': 'Databases'
        },
        'skill_ai_prompts': {
            'pt': 'Prompts para IA',
            'en': 'AI Prompts'
        },
        'skill_llm': {
            'pt': 'Modelos de Linguagem',
            'en': 'Language Models'
        },
        'skill_content_creation': {
            'pt': 'Criação de Conteúdo',
            'en': 'Content Creation'
        },
        'skill_javascript': {
            'pt': 'JavaScript',
            'en': 'JavaScript'
        },
        'skill_nodejs': {
            'pt': 'Node.js',
            'en': 'Node.js'
        },
        'skill_variables': {
            'pt': 'Variáveis',
            'en': 'Variables'
        },
        'skill_operators': {
            'pt': 'Operadores',
            'en': 'Operators'
        },
        'skill_datatypes': {
            'pt': 'Tipos de Dados',
            'en': 'Data Types'
        },
        'skill_controlflow': {
            'pt': 'Controle de Fluxo',
            'en': 'Control Flow'
        },
        'skill_loops': {
            'pt': 'Estruturas de Repetição',
            'en': 'Loops'
        },
        'skill_async': {
            'pt': 'Assincronismo',
            'en': 'Asynchronism'
        },
        'skill_inquirer': {
            'pt': 'Inquirer.js',
            'en': 'Inquirer.js'
        },
        'skill_html': {
            'pt': 'HTML',
            'en': 'HTML'
        },
        'skill_css': {
            'pt': 'CSS',
            'en': 'CSS'
        },
        'skill_responsive': {
            'pt': 'Design Responsivo',
            'en': 'Responsive Design'
        },
        'skill_mobile_first': {
            'pt': 'Mobile First',
            'en': 'Mobile First'
        },
        'skill_media_queries': {
            'pt': 'Media Queries',
            'en': 'Media Queries'
        },
        'skill_dev_environment': {
            'pt': 'Ambiente de Desenvolvimento',
            'en': 'Development Environment'
        },
        'skill_semantics': {
            'pt': 'HTML Semântico',
            'en': 'Semantic HTML'
        },
        'skill_css_variables': {
            'pt': 'Variáveis CSS',
            'en': 'CSS Variables'
        },
        'skill_layout': {
            'pt': 'Layouts',
            'en': 'Layouts'
        },
        'skill_flexbox': {
            'pt': 'Flexbox',
            'en': 'Flexbox'
        },
        'skill_positioning': {
            'pt': 'Posicionamento',
            'en': 'Positioning'
        },
        'skill_css_classes': {
            'pt': 'Classes CSS',
            'en': 'CSS Classes'
        },
        'skill_programming_fundamentals': {
            'pt': 'Fundamentos de Programação',
            'en': 'Programming Fundamentals'
        },
        
        // Certificate Buttons
        'cert_view_button': {
            'pt': 'Ver certificado',
            'en': 'View certificate'
        }
    };
    
    // Make translations globally available
    window.translations = translations;
    
    // Language change function
    function changeLanguage(lang) {
        console.log('Changing language to:', lang);
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('language', lang);
        
        const translatableElements = document.querySelectorAll('[data-i18n]');
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key][lang];
                } else {
                    element.innerHTML = translations[key][lang];
                }
            }
        });
    }
    
    // Make the function globally available
    window.changeLanguage = changeLanguage;
    
    // Setup language buttons
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
    
    // IMPORTANT: Initialize with saved language - this is the key fix
    // Run this as soon as DOM is loaded and again after a small delay to ensure it takes effect
    const savedLanguage = localStorage.getItem('language') || 'pt';
    console.log('Saved language from localStorage:', savedLanguage);
    
    // Apply language immediately
    changeLanguage(savedLanguage);
    
    // And also after a small delay to ensure all dynamic content is ready
    setTimeout(() => {
        // Apply language again to catch any late-loading elements
        changeLanguage(savedLanguage);
        
        // Update active state on language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === savedLanguage) {
                btn.classList.add('active');
            }
        });
        
        console.log('Language applied again after delay:', savedLanguage);
    }, 300);
    
    // Setup translatable elements
    setupTranslatableElements();
    
    function setupTranslatableElements() {
        // Navegação
        const navItems = document.querySelectorAll('nav ul li a');
        if (navItems.length >= 6) {
            navItems[0].setAttribute('data-i18n', 'nav_home');
            navItems[1].setAttribute('data-i18n', 'nav_about');
            navItems[2].setAttribute('data-i18n', 'nav_skills');
            navItems[3].setAttribute('data-i18n', 'nav_projects');
            navItems[4].setAttribute('data-i18n', 'nav_certificates');
            navItems[5].setAttribute('data-i18n', 'nav_contact');
        }
        
        // Seção Hero
        const heroH1 = document.querySelector('.hero h1');
        if (heroH1) heroH1.setAttribute('data-i18n', 'hero_title');
        
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) subtitle.setAttribute('data-i18n', 'hero_subtitle');
        
        // Botões do Hero
        const cvBtn = document.querySelector('.cv-btn');
        if (cvBtn) cvBtn.innerHTML = '<i class="fas fa-file-download"></i> <span data-i18n="hero_btn_cv">Baixar CV</span>';
        
        const contactBtn = document.querySelector('a[href="#contact"].btn');
        if (contactBtn) contactBtn.innerHTML = '<span data-i18n="hero_btn_talk">Vamos conversar</span>';
        
        const projectsBtn = document.querySelector('a[href="#projects"].btn');
        if (projectsBtn) projectsBtn.innerHTML = '<span data-i18n="hero_btn_projects">Ver projetos</span>';
        
        // Seção Sobre
        const aboutHeader = document.querySelector('#about .section-header h2');
        if (aboutHeader) aboutHeader.setAttribute('data-i18n', 'about_title');
        
        const aboutTexts = document.querySelectorAll('#about .about-text p');
        if (aboutTexts.length >= 2) {
            aboutTexts[0].setAttribute('data-i18n', 'about_text_1');
            aboutTexts[1].setAttribute('data-i18n', 'about_text_2');
        }
        
        // Seção Estatísticas
        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels.length >= 3) {
            statLabels[0].setAttribute('data-i18n', 'stats_experience');
            statLabels[1].setAttribute('data-i18n', 'stats_projects');
            statLabels[2].setAttribute('data-i18n', 'stats_commits');
        }
        
        // Seção Competências
        const competenciesHeader = document.querySelector('#competencies .section-header h2');
        if (competenciesHeader) competenciesHeader.setAttribute('data-i18n', 'competencies_title');
        
        const competencyGroups = document.querySelectorAll('.competencies-group h3');
        if (competencyGroups.length >= 3) {
            competencyGroups[0].setAttribute('data-i18n', 'competencies_frontend');
            competencyGroups[1].setAttribute('data-i18n', 'competencies_backend');
            competencyGroups[2].setAttribute('data-i18n', 'competencies_tools');
        }
        
        // Seção Habilidades
        const skillsHeader = document.querySelector('#skills .section-header h2');
        if (skillsHeader) skillsHeader.setAttribute('data-i18n', 'skills_title');
        
        const skillCards = document.querySelectorAll('.skill-card');
        if (skillCards.length >= 4) {
            // Primeiro card de habilidade - Frontend
            const frontendTitle = skillCards[0].querySelector('h3');
            if (frontendTitle) frontendTitle.setAttribute('data-i18n', 'skills_frontend_title');
            
            const frontendDesc = skillCards[0].querySelector('p');
            if (frontendDesc) frontendDesc.setAttribute('data-i18n', 'skills_frontend_desc');
            
            // Segundo card de habilidade - Aplicações Web
            const webTitle = skillCards[1].querySelector('h3');
            if (webTitle) webTitle.setAttribute('data-i18n', 'skills_web_title');
            
            const webDesc = skillCards[1].querySelector('p');
            if (webDesc) webDesc.setAttribute('data-i18n', 'skills_web_desc');
            
            // Terceiro card de habilidade - Programação Avançada
            const advTitle = skillCards[2].querySelector('h3');
            if (advTitle) advTitle.setAttribute('data-i18n', 'skills_advanced_title');
            
            const advDesc = skillCards[2].querySelector('p');
            if (advDesc) advDesc.setAttribute('data-i18n', 'skills_advanced_desc');
            
            // Terceiro card de habilidade - DevOps
            const devopsTitle = skillCards[3].querySelector('h3');
            if (devopsTitle) devopsTitle.setAttribute('data-i18n', 'skills_devops_title');
            
            const devopsDesc = skillCards[3].querySelector('p');
            if (devopsDesc) devopsDesc.setAttribute('data-i18n', 'skills_devops_desc');
        }
        
        // Seção Projetos
        const projectsHeader = document.querySelector('#projects .section-header h2');
        if (projectsHeader) projectsHeader.setAttribute('data-i18n', 'projects_title');
        
        // Botões de filtro de projetos
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length >= 4) {
            filterBtns[0].setAttribute('data-i18n', 'filter_all');
            filterBtns[1].setAttribute('data-i18n', 'filter_web');
            filterBtns[2].setAttribute('data-i18n', 'filter_java');
            filterBtns[3].setAttribute('data-i18n', 'filter_other');
        }
        
        // Cards de projetos individuais
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            const projectTitle = card.querySelector('h3');
            const projectDesc = card.querySelector('p');
            const projectBtn = card.querySelector('.project-btn');
            
            if (projectTitle && projectDesc) {
                // Atribuir traduções com base no texto do título para mapeamento
                const titleText = projectTitle.textContent.trim();
                
                if (titleText === "Jogo do Número Secreto") {
                    projectTitle.setAttribute('data-i18n', 'project_secret_number_title');
                    projectDesc.setAttribute('data-i18n', 'project_secret_number_desc');
                } else if (titleText === "Sorteio de Amigo Secreto") {
                    projectTitle.setAttribute('data-i18n', 'project_secret_friend_title');
                    projectDesc.setAttribute('data-i18n', 'project_secret_friend_desc');
                } else if (titleText === "OurTube") {
                    projectTitle.setAttribute('data-i18n', 'project_ourtube_title');
                    projectDesc.setAttribute('data-i18n', 'project_ourtube_desc');
                } else if (titleText === "Plann.er") {
                    projectTitle.setAttribute('data-i18n', 'project_planner_title');
                    projectDesc.setAttribute('data-i18n', 'project_planner_desc');
                } else if (titleText === "To-do List") {
                    projectTitle.setAttribute('data-i18n', 'project_todo_title');
                    projectDesc.setAttribute('data-i18n', 'project_todo_desc');
                }
            }
            
            if (projectBtn) {
                const btnText = document.createElement('span');
                btnText.setAttribute('data-i18n', 'project_btn_code');
                btnText.textContent = 'Ver Código';
                
                const icon = projectBtn.querySelector('i.fab');
                
                projectBtn.innerHTML = '';
                if (icon) projectBtn.appendChild(icon.cloneNode(true));
                projectBtn.appendChild(document.createTextNode(' '));
                projectBtn.appendChild(btnText);
            }
        });
        
        // Seção Contato
        const contactHeader = document.querySelector('#contact .section-header h2');
        if (contactHeader) contactHeader.setAttribute('data-i18n', 'contact_title');
        
        const contactSubtitle = document.querySelector('#contact .section-subtitle');
        if (contactSubtitle) contactSubtitle.setAttribute('data-i18n', 'contact_subtitle');
        
        // Cartão de contato
        const contactCard = document.querySelector('.contact-card');
        if (contactCard) {
            const cardTitle = contactCard.querySelector('h3');
            if (cardTitle) cardTitle.setAttribute('data-i18n', 'contact_card_title');
            
            const cardText = contactCard.querySelector('p');
            if (cardText) cardText.setAttribute('data-i18n', 'contact_card_text');
            
            // Cabeçalhos de métodos de contato
            const methodDetails = contactCard.querySelectorAll('.method-details h4');
            if (methodDetails.length >= 3) {
                methodDetails[0].setAttribute('data-i18n', 'contact_email');
                methodDetails[1].setAttribute('data-i18n', 'contact_phone');
                methodDetails[2].setAttribute('data-i18n', 'contact_location');
            }
            
            // Valor da localização (específico para tradução com Brasil)
            const locationSpan = contactCard.querySelector('.method-details h4[data-i18n="contact_location"] + span');
            if (locationSpan) locationSpan.setAttribute('data-i18n', 'contact_location_value');
            
            // Cabeçalho de links sociais
            const socialHeader = contactCard.querySelector('.social-links-container h4');
            if (socialHeader) socialHeader.setAttribute('data-i18n', 'contact_social');
        }
        
        // Formulário de contato
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const formTitle = contactForm.querySelector('h3');
            if (formTitle) formTitle.setAttribute('data-i18n', 'form_title');
            
            // Rótulos do formulário
            const formLabels = contactForm.querySelectorAll('label');
            if (formLabels.length >= 4) {
                formLabels[0].setAttribute('data-i18n', 'form_name');
                formLabels[1].setAttribute('data-i18n', 'form_email');
                formLabels[2].setAttribute('data-i18n', 'form_subject');
                formLabels[3].setAttribute('data-i18n', 'form_message');
            }
            
            // Placeholders de entrada do formulário
            const nameInput = contactForm.querySelector('#name');
            if (nameInput) nameInput.setAttribute('data-i18n', 'form_name_placeholder');
            
            const emailInput = contactForm.querySelector('#email');
            if (emailInput) emailInput.setAttribute('data-i18n', 'form_email_placeholder');
            
            const subjectInput = contactForm.querySelector('#subject');
            if (subjectInput) subjectInput.setAttribute('data-i18n', 'form_subject_placeholder');
            
            const messageInput = contactForm.querySelector('#message');
            if (messageInput) messageInput.setAttribute('data-i18n', 'form_message_placeholder');
            
            // Botão de envio
            const submitBtn = contactForm.querySelector('.submit-btn .btn-text');
            if (submitBtn) submitBtn.setAttribute('data-i18n', 'form_submit');
            
            // Mensagens do formulário
            const successMsg = contactForm.querySelector('.success-message');
            if (successMsg) successMsg.setAttribute('data-i18n', 'form_success');
            
            const errorMsg = contactForm.querySelector('.error-message');
            if (errorMsg) errorMsg.setAttribute('data-i18n', 'form_error');
        }
        
        // Rodapé
        const footerText = document.querySelector('footer p');
        if (footerText) footerText.setAttribute('data-i18n', 'footer_text');
    }
});