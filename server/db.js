const { MongoClient } = require('mongodb');


const client = new MongoClient('mongodb://localhost:27017/');
const db_name = 'flashcards'
const collections = {
    'cards': 'cards',
    'categories': 'categories'
}


async function getData(){
   
    return {
        cards: await getCards(),
        categories: await getCategories()
    }
}

async function getCategories() {
    await client.connect().then(async () => {
        await populateCategories(client);
    })
    return client.db(db_name).collection(collections['categories']).find({}).toArray();
}

async function getCards() {
   // console.log("Getting Cards: " + collections['cards']);
    await populateCards(client);

    return client.db(db_name).collection(collections['cards']).find({}).toArray();
}

async function insertCategory(category) {
    await client.connect().then(async () => {
        await populateCategories(client);
    })
    return client.db(db_name).collection(collections['categories']).insertOne(category);
}

async function createDefault(_client, _collection_name, _defaults, _properties) {
    _client.db(db_name).collection(_collection_name).createIndex(_properties, { unique: true }).catch((error)=>{
        console.log("Failed create index: " + error);
    })
    _client.db(db_name).collection(_collection_name).insertMany(_defaults).catch((error)=>{
        console.log(`Failed to insert default ${_collection_name}: ` + error);
    })
}

async function populateCards(_client) {
    await _client.connect().then(async () => {
        await doesCollectionExist(_client, db_name, collections['cards']).then((exists) => {
            if (!exists) {
                _client.db(db_name).createCollection(collections['cards']);
                const default_cards = [
                    { 
                        question: 'What is 2+2?', 
                        answer: '4',
                        category: 'Math'
                    }
                    
                ];
                createDefault(_client, collections['cards'], default_cards, { question: 1 });
                console.log("Populating Cards");
            }
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });
}

async function populateCategories(_client) {
    
    await _client.connect().then(async () => {
        await doesCollectionExist(_client, db_name, collections['categories']).then((exists) => {
            if (!exists) {
                _client.db(db_name).createCollection(collections['categories']);
                const default_categories = [
                    { name: 'Cloud Concepts' },
                    { name: 'Security and Compliance' },
                    { name: 'Technology' },
                    { name: 'Billing & Pricing' }
                ];
                createDefault(_client, collections['categories'], default_categories, { name: 1 });
                console.log("Populating Categories");
            }
        });
    })
    

}

async function deleteCategory(category) {
    await client.connect().then(async () => {
        client.db(db_name).collection(collections['cards']).deleteMany({ category: category });
        client.db(db_name).collection(collections['categories']).deleteOne({ name: category });
    })
    
    return await getData();
}



async function insertCard(card) {
    await client.connect().then(async () => {
        await doesCollectionExist(client, db_name, collections['cards']).then((exists) => {
            if (!exists) {
                client.db(db_name).createCollection(collections['cards']);
            }
        });
        await client.db(db_name).collection(collections['cards']).find({ category: card.category }).toArray().then((cards) => {
            if (cards.length === 0) {
                console.log(`Creating category ${card.category}`);
                client.db(db_name).collection(collections['categories']).insertOne({ name: card.category });
                
            } else {
                console.log(`Category ${card.category} already exists`);
            }
            client.db(db_name).collection(collections['cards']).insertOne(card);
        });
    })

    

    

    
    //console.log(await getData());
    return await getData();

}


function doesCollectionExist(client, db_name, collection_name) {
    return client.db(db_name).listCollections().toArray().then((collections) => {
        return collections.some((collection) => collection.name === collection_name);
    });
}





module.exports = { getCards, getData, insertCard, deleteCategory }