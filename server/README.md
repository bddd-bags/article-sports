npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string
npx sequelize-cli model:generate --name Category --attributes name:string
npx sequelize-cli model:generate --name Article --attributes title:string,slug:string,description:text,img:string,user_id:integer,category_id:integer

npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all