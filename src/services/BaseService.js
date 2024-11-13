/**
 * Common functionality for Services. Avoids duplicating CRUD operations.
 */

class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(data) { return this.model.create(data); }
    async findById(id) { return this.model.findById(id); }
    async findOne(query) { return this.model.findOne(query); }
    async findAll(query) { return this.model.find(query); }
    async update(id, data) { return this.model.findByIdAndUpdate(id, data, { new: true }); }
    async deleteById(id) { return this.model.findByIdAndDelete(id); }
}

export default BaseService;