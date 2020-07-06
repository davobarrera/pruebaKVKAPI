import { aplicarOpciones } from '../util/filtroHelpers.js'

export default class UserService {
    #model;
    #UserWithoutAlbumOrTrack;

    constructor({ DI }) {
        this.#model = DI.models.User;
        this.#UserWithoutAlbumOrTrack = DI.models.UserWithoutAlbumOrTrack;
    }

    async callUserWithoutAlbumOrTrack() {
        const result = await this.#UserWithoutAlbumOrTrack();
        return result[0][0]['@out'];
    }

    getAll(opciones) {
        return this.#model.findAll(aplicarOpciones(opciones))
    }

    getById(id){
        return this.#model.findByPk(id)
    }
    async update(id,payload){
        let obj = await this.#model.findByPk(id)
        Object.assign(obj,payload);
        return await obj.save();
    }
    async _new(payload){
        let obj = await this.#model.create(payload)
        return await obj.save();
    }
    async delete(id){
        let obj = await this.#model.findByPk(id)
        return obj.destroy();
    }
}

