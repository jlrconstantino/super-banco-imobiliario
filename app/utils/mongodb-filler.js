///////// Preenchimento da base de dados ///////////

// Dependências
import db from "../config/models.config.js";
import "../config/models.config.js";

// Conexão
await db.mongoose.connect(db.url);

// Aviso
console.log("Connected to the database successfully.")

// Aquisição dos modelos
const credit_card_model = db.mongoose.model("credit_card");
const delivery_address_model = db.mongoose.model("delivery_address");
const category_model = db.mongoose.model("category");
const product_category_model = db.mongoose.model("product_category");
const product_model = db.mongoose.model("product");
const user_model = db.mongoose.model("user");
const ratings_model = db.mongoose.model("ratings");
const cart_product_model = db.mongoose.model("cart_product");
const shopping_cart_model = db.mongoose.model("shopping_cart");

// Remoção
await category_model.deleteMany({});
await product_category_model.deleteMany({});
await product_model.deleteMany({});
await user_model.deleteMany({});
await credit_card_model.deleteMany({});
await delivery_address_model.deleteMany({});
await ratings_model.deleteMany({});
await cart_product_model.deleteMany({});
await shopping_cart_model.deleteMany({});

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
        image_source: "arduino_led.jpg",
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
        image_source: "changing_stuff.jpg",
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
        image_source: "commit_messages.jpeg",
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
        image_source: "convoluted_coding.jpg",
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
        image_source: "hoping_this_works.jpg",
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
        image_source: "ignoring_deprecation.jpg",
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
        image_source: "interview_questions.jpg",
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
        image_source: "regex.jpg",
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
        image_source: "resolving_dependencies.webp",
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
        image_source: "title_goes_here.webp",
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
        image_source: "trying_stuff.jpg", 
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
        image_source: "what_is_ligma.png",
    },
];

// Salva os livros
for(const product of products){
    let element = new product_model(product);
    await element.save();
}

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
users.forEach(async (user) => {
    let element = new user_model(user);
    await element.save();
});

// Cartões de crédito
const credit_cards = [
    {
        user: 0, 
        number: "2901 9934 5421 5555", 
        title: "Cartão-1", 
        security_code: "928", 
        cardholder: "Customer", 
        expiration_date: "2026-09", 
    }, 
    {
        user: 0, 
        number: "1005 2994 3302 1098", 
        title: "Cartão-2", 
        security_code: "414", 
        cardholder: "Josivaldo", 
        expiration_date: "2027-02", 
    }, 
    {
        user: 0, 
        number: "7885 6652 1982 0094", 
        title: "Cartão-3", 
        security_code: "200", 
        cardholder: "Helena", 
        expiration_date: "2025-12", 
    }, 
    {
        user: 1, 
        number: "9999 8888 7777 6666", 
        title: "Cartão-Mestre", 
        security_code: "300", 
        cardholder: "ADM", 
        expiration_date: "2025-10", 
    }, 
    {
        user: 1, 
        number: "7550 4450 8872 3009", 
        title: "Cartão de Administração", 
        security_code: "666", 
        cardholder: "O Administrador", 
        expiration_date: "2999-12", 
    }, 
];

// Salva os cartões
for(const credit_card of credit_cards){
    const element = new credit_card_model(credit_card);
    await element.save();
}

// Endereços de entrega
const delivery_addresses = [
    {
        user: 0, 
        zip: "15900-200", 
        title: "Endereço-0", 
        state: "Minas Gerais", 
        city: "Cidade-X", 
        district: "Alagoinha", 
        street: "Rua das Almofadas", 
        number: 9920, 
        complement: "", 
    }, 
    {
        user: 0, 
        zip: "12866-790", 
        title: "Casalabresa", 
        state: "São Paulo", 
        city: "São Paulo", 
        district: "Distrito-XYZ", 
        street: "Avenida Alves Cunha Limonada", 
        number: 192, 
        complement: "Apto 87", 
    }, 
    {
        user: 0, 
        zip: "16999-122", 
        title: "Endereço 42", 
        state: "Rio Grande do Sul", 
        city: "Sulinha", 
        district: "Sulinova", 
        street: "Rua das Sulis", 
        number: 1872, 
        complement: "Ed. Sul Apto. 11", 
    }, 
    {
        user: 0, 
        zip: "09887-444", 
        title: "Endereço Qualquer Aí", 
        state: "Bahia", 
        city: "Soninho", 
        district: "Soneca", 
        street: "Rua do Sono", 
        number: 778, 
        complement: "", 
    }, 
    {
        user: 1, 
        zip: "96669-666", 
        title: "Endereço do ADM", 
        state: "Rio de Janeiro", 
        city: "Adminópolis", 
        district: "Admin-District", 
        street: "Avenida dos Supremos", 
        number: 625, 
        complement: "Ed. dos ADMs, Apto. 64", 
    }, 
    {
        user: 1, 
        zip: "15550-877", 
        title: "Casa Dele", 
        state: "São Paulo", 
        city: "Desconhecida", 
        district: "Não Sei", 
        street: "Avenida da Falta de Ideias", 
        number: 998, 
        complement: "Apto. 44", 
    }, 
];

// Salva os endereços
for(const delivery_address of delivery_addresses){
    const element = new delivery_address_model(delivery_address);
    await element.save();
}

// Categorias
const categories = [
    {id: 0, name: "Infantil"}, 
    {id: 1, name: "Literatura Internacional"}, 
    {id: 2, name: "Literatura Brasileira"}, 
    {id: 3, name: "Ficção Científica"}, 
    {id: 4, name: "História"}, 
    {id: 5, name: "Biografia"}, 
    {id: 6, name: "Autoajuda"}, 
    {id: 7, name: "Psicologia"}, 
    {id: 8, name: "Terror"}, 
];

// Salva as categorias
for(const category of categories){
    const element = new category_model(category);
    await element.save();
}

// Relacionamento entre os livros e as categorias
const product_categories = [

    // Livro 0
    {product: 0, category: 1}, 
    {product: 0, category: 3}, 

    // Livro 1
    {product: 1, category: 5}, 

    // Livro 2
    {product: 2, category: 6}, 

    // Livro 3
    {product: 3, category: 4}, 

    // Livro 4
    {product: 4, category: 0}, 
    {product: 4, category: 2}, 

    // Livro 5
    {product: 5, category: 6}, 
    {product: 5, category: 1}, 

    // Livro 6
    {product: 6, category: 7}, 
    {product: 6, category: 1}, 

    // Livro 7
    {product: 7, category: 4}, 
    {product: 7, category: 2}, 

    // Livro 8
    {product: 8, category: 4}, 
    {product: 8, category: 8}, 

    // Livro 9
    {product: 9, category: 2}, 
    {product: 9, category: 8}, 

    // Livro 10
    {product: 10, category: 1}, 
    {product: 10, category: 3}, 
    {product: 10, category: 8}, 

    // Livro 11
    {product: 11, category: 8}, 
];

// Salva as categorias dos livros
for(const product_category of product_categories){
    let element = new product_category_model(product_category);
    await element.save();
}

// Avisa e encerra o processo
console.log("Data registered successfully.");
await db.mongoose.disconnect();
process.exit();