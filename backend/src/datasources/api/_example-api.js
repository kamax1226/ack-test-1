import { RESTDataSource } from 'apollo-datasource-rest';

class ExampleAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }
    async test() {
        const response = await this.get(`/users`);
        const users = response?.map(item => {
          const { id, email } = item
          return { id, email }
        })
        return users
    }
}

export default ExampleAPI