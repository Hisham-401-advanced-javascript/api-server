require('@code-fellows/supergoose');

const categoryModel = require('../lib/models/categories/categories.collection.js');


beforeEach(async () => {
    await categoryModel.schema.deleteMany({});
});

it('should exist', () => {
    expect(categoryModel).toBeDefined();
});

it('should get all when empty', async () => {
    const allCategories = await categoryModel.get();
    expect(allCategories.length).toBe(0);
});

it('should create', async () => {
    const silverwareData = { name: 'silverware', display_name: 'silver', description: 'polished' };
    const createdCategory = await categoryModel.create(silverwareData);
    silverwareData._id = createdCategory._id;
    verifyProps(silverwareData, createdCategory);
});

it('should get all when not empty', async () => {
    const silverwareData = { name: 'silverware', display_name: 'silver', description: 'polished' };
    await categoryModel.create(silverwareData);
    const allCategories = await categoryModel.get();
    expect(allCategories.length).toBe(1);
    verifyProps(silverwareData, allCategories[0]);

});

it('should get one when not empty', async () => {
    const silverwareData = { name: 'silverware', display_name: 'silver', description: 'polished' };
    const silverwareCreated = await categoryModel.create(silverwareData);
    const silverwareRetrieved = await categoryModel.get(silverwareCreated._id);
    verifyProps(silverwareData, silverwareRetrieved[0]);
});

it('should update', async () => {
    const silverwareCreated = await createSilverware();
    const silverwareDataConverted = JSON.parse(JSON.stringify(silverwareCreated));
    silverwareDataConverted.description = 'tarnished';
    const silverwareRetrieved = await categoryModel.update(silverwareDataConverted._id, silverwareDataConverted);
    expect(silverwareRetrieved.description).toBe('tarnished');
});

// it('should patch', async () => {
//   const silverwareCreated = await createSilverware();
//   const silverwareRetrieved = await categoryModel.patch(silverwareCreated._id, { description: 'tarnished'});
//   expect(silverwareRetrieved.description).toBe('tarnished');
// });

it('should delete', async () => {
    const silverware = await createSilverware();
    await categoryModel.delete(silverware._id);
    const allCategories = await categoryModel.get();
    expect(allCategories.length).toBe(0);
});

async function createSilverware(name = 'silverware', display_name = 'silver', description = 'polished') {
    const silverwareData = { name, display_name, description };
    return categoryModel.create(silverwareData);
}

function verifyProps(a, b) {
    for (let key in a) {

        const valueA = a[key];

        const valueB = b[key];

        expect(valueA).toBe(valueB);
    }
}