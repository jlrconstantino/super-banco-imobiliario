"use strict"

// Funções assíncronas para manipulação de armazenamento local
function later() {
    return new Promise((resolve) => setTimeout(resolve, 100));
}
export async function get_item(key) {
    later(); 
    return JSON.parse(localStorage.getItem(key));
}
export async function set_item(key, value) {
    later(); 
    localStorage.setItem(key, JSON.stringify(value));
}
export async function delete_item(key) {
    later();
    localStorage.removeItem(key);
}


// Inicialização do armazenamento local
export async function start_local_storage() {

    // Livros
    const products = [
        {
            id: 0, 
            title: "Getting an Arduino LED to Blink", 
            price: 49.90, 
            stock: 4, 
            rating: 4.5, 
            sales: 20, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Cartonado", 
            year: 2017, 
            language: "Portugol", 
            pages: 128, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/arduino_led.jpg"),
        }, 
        {
            id: 1, 
            title: "Changing Stuff and Seeing What Happens", 
            price: 29.90, 
            stock: 21, 
            rating: 4.8, 
            sales: 49, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Brochura", 
            year: 2012, 
            language: "Português", 
            pages: 145, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/changing_stuff.jpg"),
        },
        {
            id: 2, 
            title: "Useless GIT Commit Messages", 
            price: 88.49, 
            stock: 9, 
            rating: 3.8, 
            sales: 2, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Mecânico", 
            year: 2021, 
            language: "Português", 
            pages: 242, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/commit_messages.jpeg"),
        },
        {
            id: 3, 
            title: "Using Convoluted Coding Practices to Piece Together a Somehow Functional Product", 
            price: 240.29, 
            stock: 2, 
            rating: 5.0, 
            sales: 15, 
            author: "Unknown",
            publisher: "O'REILLY",
            finishing: "Cartunado", 
            year: 2015, 
            language: "Inglês", 
            pages: 199, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/convoluted_coding.jpg"),
        },
        {
            id: 4, 
            title: "Hoping This Works", 
            price: 9.90, 
            stock: 15, 
            rating: 1.0, 
            sales: 29, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Agrafado", 
            year: 1999, 
            language: "Alemão", 
            pages: 58, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/hoping_this_works.jpg"),
        },
        {
            id: 5, 
            title: "Ignoring Deprecation Warnings", 
            price: 32.89, 
            stock: 1, 
            rating: 0.2, 
            sales: 92, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Brochado", 
            year: 2020, 
            language: "Latim", 
            pages: 120, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/ignoring_deprecation.jpg"),
        },
        {
            id: 6, 
            title: "Hoping for the Right Interview Questions", 
            price: 67.89, 
            stock: 19, 
            rating: 2.9, 
            sales: 9, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Agrafado", 
            year: 2022, 
            language: "Latim", 
            pages: 79, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/interview_questions.jpg"),
        },
        {
            id: 7, 
            title: "Googling for the Regex", 
            price: 129.90, 
            stock: 8, 
            rating: 4.4, 
            sales: 27, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Cartunado", 
            year: 2014, 
            language: "Inglês", 
            pages: 690, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/regex.jpg"),
        },
        {
            id: 8, 
            title: "Resolving Broken Dependencies", 
            price: 419.90, 
            stock: 12, 
            rating: 2.4, 
            sales: 12, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Brochado", 
            year: 2012, 
            language: "Português", 
            pages: 310, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/resolving_dependencies.webp"),
        },
        {
            id: 9, 
            title: "Title Goes Here", 
            price: 14.90, 
            stock: 10, 
            rating: 3.3, 
            sales: 19, 
            author: "Kanye West",
            publisher: "O RLY?",
            finishing: "Mecânico", 
            year: 2004, 
            language: "Inglês", 
            pages: 107, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/title_goes_here.webp"),
        },
        {
            id: 10, 
            title: "Trying Stuff Until it Works", 
            price: 16.90, 
            stock: 3, 
            rating: 4.0, 
            sales: 42, 
            author: "The Practical Developer",
            publisher: "O RLY?",
            finishing: "Brochado", 
            year: 2009, 
            language: "Latim", 
            pages: 420, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/trying_stuff.jpg"), 
        }, 
        {
            id: 11, 
            title: "What is LIGMA", 
            price: 22.70, 
            stock: 1, 
            rating: 3.0, 
            sales: 56, 
            author: "B. J. Gay",
            publisher: "O RLY?",
            finishing: "Agrafado", 
            year: 1919, 
            language: "Espanhol", 
            pages: 624, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis quam ultricies, dapibus mi quis, euismod enim. Curabitur id vehicula.",
            image_source: require("@/assets/sample-books/what_is_ligma.png"),
        },
    ];

    // Salva os livros
    products.forEach((product, index) => {
        set_item("product#" + index, product);
    });

    // Usuários
    const users = [
        {
            id: 0, 
            email: "customer@email.com", 
            name: "Cliente", 
            password: "123", 
            phone_number: "(11) 99998-2888", 
            birth_date: "1995-09-14", 
            role: "customer", 
        }, 
        {
            id: 1, 
            email: "admin@email.com", 
            name: "Administrador", 
            password: "123", 
            phone_number: "(99) 11111-2222", 
            birth_date: "2007-12-09", 
            role: "admin", 
        }, 
    ];

    // Salva os usuários
    users.forEach((user, index) => {
        set_item("user#" + index, user);
    });

    // Categorias
    const categories = [
        {id: 0, name: ""}, 
        {id: 1, name: "Infantil"}, 
        {id: 2, name: "Literatura Internacional"}, 
        {id: 3, name: "Literatura Brasileira"}, 
        {id: 4, name: "Ficção Científica"}, 
        {id: 5, name: "História"}, 
        {id: 6, name: "Biografia"}, 
        {id: 7, name: "Autoajuda"}, 
        {id: 8, name: "Psicologia"}, 
        {id: 9, name: "Terror"}, 
    ];

    // Salva as categorias
    categories.forEach((category, index) => {
        set_item("category#" + index, category);
    });

    // Relacionamento entre os livros e as categorias
    const product_category = [

        // Livro 1
        {product: 1, category: 2}, 
        {product: 1, category: 4}, 

        // Livro 2
        {product: 2, category: 6}, 

        // Livro 3
        {product: 3, category: 7}, 

        // Livro 4
        {product: 4, category: 5}, 

        // Livro 5
        {product: 5, category: 1}, 
        {product: 5, category: 3}, 

        // Livro 6
        {product: 6, category: 7}, 
        {product: 6, category: 2}, 

        // Livro 7
        {product: 7, category: 8}, 
        {product: 7, category: 2}, 

        // Livro 8
        {product: 8, category: 5}, 
        {product: 8, category: 3}, 

        // Livro 9
        {product: 9, category: 5}, 
        {product: 9, category: 9}, 

        // Livro 10
        {product: 10, category: 3}, 
        {product: 10, category: 9}, 

        // Livro 11
        {product: 11, category: 2}, 
        {product: 11, category: 4}, 
        {product: 11, category: 9}, 

        // Livro 12
        {product: 12, category: 9}, 
    ];

    // Salva as categorias dos livros
    product_category.forEach((element, index) => {
        set_item("product_category#" + index, element);
    });
}


// Função-base de carregamento de itens
export async function load_local_storage_elements(identifier) {
    let array = [];
    for(let i = 0;; i++){
        let response = await get_item(identifier + i);
        if(response != null) {
            array.push(response);
        }else{
            break;
        }
    }
    return array;
}