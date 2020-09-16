require('@code-fellows/supergoose');

const productModel = require('../lib/models/products/products.collection.js');


beforeEach(async () => {
    await productModel.schema.deleteMany({});
});

it('should exist', () => {
    expect(productModel).toBeDefined();
});

it('should get all when empty', async () => {
    const allProducts = await productModel.get();
    expect(allProducts.length).toBe(0);
});

it('should create', async () => {
    const forkData = { name: 'fork', display_name: 'Fork', category: 'silverware', description: 'polished' };
    const createdProduct = await productModel.create(forkData);
    forkData._id = createdProduct._id;
    verifyProps(forkData, createdProduct);
});

it('should get all when not empty', async () => {
    const forkData = { name: 'fork', display_name: 'Fork', category: 'silverware', description: 'polished' };
    await productModel.create(forkData);
    const allProducts = await productModel.get();
    expect(allProducts.length).toBe(1);
    verifyProps(forkData, allProducts[0]);
});

it('should get one when not empty', async () => {
    const forkData = { name: 'fork', display_name: 'Fork', category: 'silverware', description: 'polished' };
    const forkCreated = await productModel.create(forkData);
    const forkRetrieved = await productModel.get(forkCreated._id);
    verifyProps(forkData, forkRetrieved[0]);
});

it('should update', async () => {
    const forkCreated = await createFork();
    const forkDataConverted = JSON.parse(JSON.stringify(forkCreated));
    forkDataConverted.category = 'cutlery';
    const forkRetrieved = await productModel.update(forkDataConverted._id, forkDataConverted);
    expect(forkRetrieved.category).toBe('cutlery');
});

// it('should patch', async () => {
//   const forkCreated = await createFork();
//   const forkRetrieved = await productModel.patch(forkCreated._id, { category: 'cutlery'});
//   expect(forkRetrieved.category).toBe('cutlery');
// });

it('should delete', async () => {
    const fork = await createFork();
    await productModel.delete(fork._id);
    const allProducts = await productModel.get();
    expect(allProducts.length).toBe(0);
});

async function createFork(name = 'fork', display_name = 'Fork', category = 'silverware', description = 'polished') {
    const forkData = { name, display_name, category, description };
    return productModel.create(forkData);
}

function verifyProps(a, b) {
    for (let key in a) {

        const valueA = a[key];

        const valueB = b[key];

        expect(valueA).toBe(valueB);
    }
}