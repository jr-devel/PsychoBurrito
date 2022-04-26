(function(){
    let question_index = 0;
    let Acount = 0;
    let Bcount = 0;
    let Ccount = 0;
    let Dcount = 0;
    let Ecount = 0;
    let selectedA = false;
    let selectedB = false;
    let selectedC = false;
    let selectedD = false;
    let selectedE = false;
    const questions = [
        "Si tuviese una actividad extracurricular durante las tardes, eligiría un curso de:",//1
        "Mi asignatura académica favorita es:",//2
        "Le tengo admiración a:",//3
        "Si fuese auxiliar de alguna persona, sería:",//4
        "Si estoy viendo la televisión, me gustan los programas de:",//5
        "Laborando en un futuro, me visualizo:",//6
        "Alguien que podría tener mi admiración y respeto, sería alguien que:",//7
        "Si llego a estar en un evento, mis tareas a realizar serían:",//8
        "Si se iniciara un nuevo negocio, mi aportación sería:",//9
        "Si leo un libro o una revista, trataría sobre:",//10
        "Si trabajara para una gran empresa, me sería grato el departamento de:",//11
        "Si tuviese una plática muy insteresante, sería con:",//12
        "Si alguien visita mi habitación, encontraría:",//13
        "Cuando voy a exposiciones, me llama más la atención la que trata sobre:",//14
        "Me sentiría felíz si pudiese:",//15
        "Si fuese de visita a algún lugar, sería:",//16
        "Prefiero hablar sobre:",//17
        "En mi tiempo libre me gusta:",//18
        "Si fuera conocido, sería por:",//19
        "Si me imagino algo, es sobre:",//20
        "Sentiría orgullo si fuera un:",//21
        "Si trabajara a medio tiempo, trabajaría en:",//22
        "Cuando aprendo algo nuevo, lo recuerdo mejor si:",//23
        "Casi siempre estoy:",//24
        "Tengo una inclinación a ser:",//25
    ];
    const answersA  = [
        "Finanzas personales",//1
        "Español, Geografía y Ciencias Sociales",//2
        "Los emprendedores convertidos en grandes empresarios",//3
        "Político",//4
        "Noticias actuales sobre economía y política",//5
        "Laborando con fórmulas y cantidades numéricas",//6
        "Es encargado de la logística que un equipo va a llevar a cabo",//7
        "Dirigiendo al personal, cotizando presupuestos y recabando el dinero",//8
        "Llevar a cabo la contabilidad",//9
        "Política, Derecho o Economía",//10
        "Administración y Contabilidad",//11
        "El presidente",//12
        "Cosas que he comprado con mis ingresos",//13
        "Debates políticos y economía",//14
        "Emprender un negocio que haga altos niveles de ganancias",//15
        "La casa de la bolsa de valores",//16
        "Economía en el país",//17
        "Crear reuniones o eventos",//18
        "Mi capacidad para concluir negocios",//19
        "Cómo hacer dinero",//20
        "Político modelo",//21
        "Un despacho",//22
        "Lo organizo con gráficas y esquemas",//23
        "Organizando reuniones y fiestas",//24
        "Ser responsable de las cuestiones financieras",//25
    ];
    const answersB  = [
        "Tecnología",//1
        "Física y Matemáticas",//2
        "Los fundadores de las redes para comunicaciones digitales",//3
        "Ingeniero o Arquitecto",//4
        "Avances tecnológicos recientes",//5
        "Laborando con maquinaria y diversos materiales",//6
        "Es creador de un producto que sea de utilidad para la vida cotidiana",//7
        "Revisando el funcionamiento adecuado del equipo de sonido",//8
        "Llevar la supervisión de las tecnologías que se requieren",//9
        "Herramientas, Instrumentos y Tecnología",//10
        "Investigaciones",//11
        "Ingeniero de un edificio inteligente",//12
        "Aparatos electrónicos y de alta tecnoloía",//13
        "Alta tecnología e inventos científicos innovadores",//14
        "Formar parte del equipo que una construcción moderna",//15
        "Una planta automotriz",//16
        "Altas tecnologías",//17
        "Conocer sobre algún tipo de software nuevo",//18
        "Mis aportaciones a la tecnoloía",//19
        "Cómo son las casas del 2040",//20
        "Gran arquitecto",//21
        "Una fábrica",//22
        "Tratando de tocar objetos",//23
        "Reparando algún aparato electrónico",//24
        "Conocer la diversidad de la vegetación que crece en mi escuela",//25
    ];
    const answersC  = [
        "Auxilios médicos",//1
        "Filosofía, Historia o Ética",//2
        "Enfermeras y Doctores",//3
        "Maestro",//4
        "Problemáticas de personas a los que dan solución",//5
        "Laborando con personas",//6
        "Es una persona que ofrece su tiempo para ayudar y servir a otros",//7
        "Atendiendo a los invitados del evento",//8
        "Darles una cálida bienvenida a los clientes",//9
        "Sociología, Humanidades y Psicología",//10
        "Recursos Humanos",//11
        "Reportero de Noticias",//12
        "Recuerdos que tienen gran valor sentimental",//13
        "Metodologías educativas, librerías y centros de idiomas",//14
        "Descubrir la cura de padecimientos y enfermedades de nuestra actualidad",//15
        "Una institución de educación especial",//16
        "Tipos de terapias psicológicas",//17
        "Ayudar a que terminen pronto su tarea mis sobrinos o hermanos pequeños",//18
        "Implementar un programa que mejore la calidad de vida de la gente de escasos recursos",//19
        "Cómo ayudar a resolver problemas personales",//20
        "Benefactor reconocido",//21
        "Un colegio",//22
        "Hablo al respecto con varias personas",//23
        "Ayudando a la gente a que resuelvan situaciones personales",//24
        "Resolver algunas problemáticas personales o familiares",//25
    ];
    const answersD  = [
        "Reciclaje",//1
        "Biología y Química",//2
        "Los creadores de nuevos medicamentos",//3
        "Científico Marino",//4
        "Documentales sobre plantas y animales",//5
        "Laborando con pequeños organismos y diversas sustancias",//6
        "Es capaz de estudiar a los seres vivos y su naturaleza",//7
        "Hacer un estudio de las instalaciones para su uso y limpieza adecuada",//8
        "Revisar que la calidad de los alimentos sea excelente",//9
        "Funciones del cuerpo y cerebro humano",//10
        "Higiene y Salud",//11
        "Médico de un hospital del área de emergencias",//12
        "Un pez, una planta y algunos suvenires de lugares que he visitado",//13
        "Fauna y flora de animales exóticos y desconocidos",//14
        "Ser el creador de nuevas especies tanto de animales como de plantas",//15
        "Un gran laboratorio de experimentos",//16
        "Nuevos descubrimientos del ADN",//17
        "Ir de visita a algún zoológico o jardín",//18
        "Mis descubrimientos médicos",//19
        "Cómo podría hacer un viaje de campamento",//20
        "Científico renombrado",//21
        "En las montañas",//22
        "Realizando un análisis profundo de toda la información",//23
        "Procurando el bienestar de un animal o planta",//24
        "Conocer enfermedades comunes y poco comunes",//25
    ];
    const answersE  = [
        "Piano o Guitarra",//1
        "Actividades artísticas",//2
        "Artistas en diversas gamas (actrices, cantantes, etc.)",//3
        "Dibujante",//4
        "Caricaturas y vídeos",//5
        "Laborando con pinturas o instrumentos musicales",//6
        "Es creador de obras musicales y artísticas que inspiran su entorno",//7
        "Preparar el diseño ambiental de un lugar del evento y el diseño de las propagandas",//8
        "Llevar a cabo el diseño e imagen tanto interna como externa del local",//9
        "Danza, Diseño, Pintura o Escultura",//10
        "Diseño, Diseño ambiental o Diseño de muebles",//11
        "Fotógrafo de una revista",//12
        "Fotografías, cuadros y carteles con imágenes llamativas",//13
        "Artes, Música y Pintura",//14
        "Ser un bailarín profesional o un gran artista",//15
        "Un estudio de grabación y video",//16
        "Afinidad por la música y el arte",//17
        "Tocar algún instrumento o practicar alguna danza",//18
        "Mis obras musicales",//19
        "Cómo hacer animaciones digitales y de video",//20
        "Artista famoso",//21
        "En el teatro",//22
        "Utilizando sonidos o movimientos",//23
        "Pintando, dibujando o tocando algún instrumento",//24
        "Ser planificador de conciertos o eventos",//25
    ];
    const results   = [
        `Tus actividades van encaminadas hacia los aspectos administrativos, económicos y de organización. Tu interés es generar riquezas mediante planeación de procedimientos, así como encaminar el logro de objetivos de algún grupo de personas. <b>Carreras Relacionadas:</b> Contaduría Pública, Economía, Administración de empresas, Mercadotecnia, Comercio Internacional, Ciencias Políticas, Derecho, Relaciones Industriales, Turismo.`,
        `Ser analítico es parte de tu esencia, el diseño y la construcción de mecanismos para satisfacer necesidades es parte de tu interés ya facilitarías la vida diaria. El manejo de materiales para crear algo original y que mejore los avances científicos. <b>Carreras Relacionadas:</b> Ingienería Civil, Ingeniero Arquitecto, Ingeniería Industrial, Ingeniería en Sistemas e Ingeniería en Computación.`,
        `El bienestar y la mejora de calidad de vida de otros es una de tus motivaciones para que las mismas puedan lograr una salud física y mental. La cinvivencia con la gente te permite cinicer su comportamiento para llegar a un objetivo determinado. <b>Carreras Relacionadas:</b> Enfermería, Pedagogía, Nutrición, Trabajo Social, Psicología, Sociología, Educación.`,
        `Tu desarrollo se logrará cuando interactúas con seres vivos y organismos. Te interesa conocer cómo es el funcionamiento de diversas sustancias, si es necesario, buscar su equilibrio y restablecer el funcionamiento previo a una alteración. La modificación y preservación de componentes orgánicos y naturales son también parte de tu interés. <b>Carreras Relacionadas:</b> Biología, Química, Ecología, Medicina, Veterinaria, Biotecnología, Ciencias Naturales.`,
        `Te apasiona todo aquello que se encuentra relacionado con el arte, la música, lo bello y lo estético. Es de suma importancia tu sensibilidad y tu imaginación. Para comunicar tus ideas y emociones utilizas tu creatividad de manera visual o auditiva pero siempre son atractivas. <b>Carreras Relacionadas:</b> Diseño Ambiental, Arquitectura, Ciencias y Técnicas de la Comunicación, Artes, Comunicación Gráfica, Diseño Gráfico.`,
    ];
    const extra = `<b>NOTA:</b> Recuerda que este test es una orientación hacia las áreas de estudio, es importante que profundices en tus preferencias, habilidades y personalidad para que logres averiguar con precisión el área de estudio que te sea afín. Procura realizar un exámen psicométrico profesional de orientación vocacional.`;
    //
    const question_title = document.getElementById('question_number');
    const question_text  = document.getElementById('question_text');
    const options        = document.querySelectorAll('.answers');
    const optA           = document.getElementById('answerA');
    const optB           = document.getElementById('answerB');
    const optC           = document.getElementById('answerC');
    const optD           = document.getElementById('answerD');
    const optE           = document.getElementById('answerE');
    const next_question  = document.getElementById('next_question');
    const submit_text    = document.getElementById('next_question-txt');
    //
    options.forEach( opt => {
        opt.addEventListener('click', function(e){
            optA.classList.remove('selected');
            optB.classList.remove('selected');
            optC.classList.remove('selected');
            optD.classList.remove('selected');
            optE.classList.remove('selected');
            opt.classList.add('selected');
        });
    })
    next_question.addEventListener('click', e => {
        e.preventDefault();
        optA.classList.remove('selected');
        optB.classList.remove('selected');
        optC.classList.remove('selected');
        optD.classList.remove('selected');
        optE.classList.remove('selected');
        //
        selected_option();
        if (question_index == 25) {
            let index = test_results(Acount,Bcount,Ccount,Dcount,Ecount);
            show_results(index);
        }
        if (question_index == 24) {
            submit_text.textContent = "Enviar";
        }
        if (question_index <= 24) {
            show_test(question_index);
        }
        question_index++;
    });
    show_test(question_index);
    function show_test(question_index) {
        question_title.textContent = `PREGUNTA ${question_index + 1}/25`;
        question_text.textContent = questions[question_index];
        optA.textContent = answersA[question_index];
        optB.textContent = answersB[question_index];
        optC.textContent = answersC[question_index];
        optD.textContent = answersD[question_index];
        optE.textContent = answersE[question_index];
    }
    function isSelected(option) {return option.classList.contains('selected')? true : false}
    function selected_option() {
        selectedA = isSelected(options[0]);
        selectedB = isSelected(options[1]);
        selectedC = isSelected(options[2]);
        selectedD = isSelected(options[3]);
        selectedE = isSelected(options[4]);
        //
        if (selectedA) Acount+=10;
        if (selectedB) Bcount+=10;
        if (selectedC) Ccount+=10;
        if (selectedD) Dcount+=10;
        if (selectedE) Ecount+=10;
    }
    function test_results(a,b,c,d,e) {
        if (a > ( b || c || d || e)){
            return 0;
        } else if (b > (a || c || d || e)){
            return 1;
        } else if (c > (a || b || d || e)){
            return 2;
        } else if (d > (a || b || c || e)){
            return 3;
        } else if (e > (a || b || c || d)){
            return 4;
        }
    }
    function show_results(index) {
        const note = document.getElementById('note');
        //
        question_title.innerHTML = `RESULTADOS`;
        question_text.innerHTML = results[index];
        options.forEach(option => option.style.display = 'none');
        next_question.style.display = 'none';
        note.innerHTML = extra;
    }
}());