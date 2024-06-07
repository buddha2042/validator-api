{
    create_user = `CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
}

{
    Install-Sequelize-and-Sequelize  `npm install sequelize sequelize-cli pg pg-hstore`    `npx sequelize-cli init`
    create_user_model `npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,first_name:string,last_name:string`
    run_migration_file `npx sequelize-cli db:migrate
    npx sequelize-cli migration:generate --name create-users
    npx sequelize-cli db:query --query="SELECT * FROM users;"


`

}