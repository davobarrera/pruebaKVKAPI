
import sequelize_loader from './sequelize.js';
import route_loader from './routes.js';
import viewsAndProcedures from './viewsAndProcedures.js';

export default async function ({config,DI,express,app}){

  await sequelize_loader({config,DI});
  await route_loader({app,DI, express,config});
  await viewsAndProcedures({config})

}
