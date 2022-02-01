// graphql.config.js
module.exports = {
    schema: ['schema.graphql'],
    extensions: {
        endpoints: {
            default: {
                url: 'http://localhost:3000/graphql'
            }
        }
    }
};
