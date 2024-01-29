import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbConnection } from './constants/constants';

export const GridFsConnection = MongooseModule.forRootAsync({
  useFactory: async () => {
    const uri = mongoDbConnection;

    return {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },
});
