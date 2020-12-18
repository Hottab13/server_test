const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

const Nests = require("../modules/nest");
const Users = require("../modules/user");
//const Tot = Nests.count({})

/*******************************/
//data.ToString()

const ToStringCura = new GraphQLObjectType({
    name: "ToStringCura",
    fields: () => ({
      data: { type: GraphQLString },
    }),
  });

/*******************************/

//.find({})
const NestType = new GraphQLObjectType({
  name: "Nest",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) }, //название гнезда
    location: { type: new GraphQLNonNull(GraphQLString) }, //локация
    type: { type: new GraphQLNonNull(GraphQLString) }, //тип мероприятия
    date: { type: new GraphQLNonNull(GraphQLString) }, //дата проведение
    time: { type: new GraphQLNonNull(GraphQLString) }, //дата проведение
    ageRestrictions: { type: new GraphQLNonNull(GraphQLInt) }, //возрастное ограничение
    amountMaximum: { type: new GraphQLNonNull(GraphQLInt) }, //максимальное количество человек
    user: {
      //связь с юзером
      type: UsersType,
      resolve(parent, args) {
        //return users.filter(user => user.nestId === parent.id);
        return Users.findById(parent.userId);
      },
    },
  }),
});
/*const TotolCountType = new GraphQLObjectType({
    name: "CountNests",
    fields: () => ({
      count:{ type: GraphQLInt },
    }),
  });*/
const UsersType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    surname: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLBoolean) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    aboutMe: { type: new GraphQLNonNull(GraphQLString) },
    nest: {
      type: new GraphQLList(NestType),
      resolve(parent, args) {
        //return Nests.filter(nest => nest.userId === userId.id);
        return Nests.find({ userId: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UsersType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        sex: { type: new GraphQLNonNull(GraphQLBoolean) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        aboutMe: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new Users({
          email: args.email,
          password: args.password,
          name: args.name,
          surname: args.surname,
          sex: args.sex,
          age: args.age,
          status: args.status,
          aboutMe: args.aboutMe,
        });
        return user.save();
      },
    },
    addNest: {
      type: NestType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, //название гнезда
        location: { type: new GraphQLNonNull(GraphQLString) }, //локация
        type: { type: new GraphQLNonNull(GraphQLString) }, //тип мероприятия
        date: { type: new GraphQLNonNull(GraphQLString) }, //дата проведение
        time: { type: new GraphQLNonNull(GraphQLString) }, //дата проведение
        ageRestrictions: { type: new GraphQLNonNull(GraphQLInt) }, //возрастное ограничение
        amountMaximum: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const nest = new Nests({
          name: args.name,
          location: args.location,
          type: args.type,
          date: args.date,
          time: args.time,
          ageRestrictions: args.ageRestrictions,
          amountMaximum: args.amountMaximum,
          userId: args.userId,
        });
        return nest.save();
      },
    },
    deleteUser: {
      type: UsersType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Users.findByIdAndRemove(args.id);
      },
    },
    deleteNest: {
      type: NestType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Nests.findByIdAndRemove(args.id);
      },
    },
    login: {
      type: UsersType,
      args: {
        // id: { type: GraphQLID } ,
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        //return users.find(user => user.id == args.id);
        return Users.findOne({
          email: args.email,
          password: args.password,
        });
      },
    },
    updateUserData: {
      type: UsersType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        sex: { type: new GraphQLNonNull(GraphQLBoolean) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        aboutMe: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Users.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              surname: args.surname,
              sex: args.sex,
              age: args.age,
              aboutMe: args.aboutMe,
            },
          },
          { new: true }
        );
      },
    },
    updateLoginAuth: {
      type: UsersType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Users.findByIdAndUpdate(
          args.id,
          {
            $set: {
              email: args.email,
              password: args.password,
            },
          },
          { new: true }
        );
      },
    },
    updateStatus: {
      type: UsersType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Users.findByIdAndUpdate(
          args.id,
          {
            $set: {
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    updateNest: {
      type: NestType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) }, //название гнезда
        location: { type: new GraphQLNonNull(GraphQLString) }, //локация
        type: { type: new GraphQLNonNull(GraphQLString) }, //тип мероприятия
        date: { type: new GraphQLNonNull(GraphQLString) }, //дата проведение
        time: { type: new GraphQLNonNull(GraphQLString) }, //дата проведение
        ageRestrictions: { type: new GraphQLNonNull(GraphQLInt) }, //возрастное ограничение
        amountMaximum: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Nests.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              location: args.location,
              type: args.type,
              date: args.date,
              time: args.time,
              ageRestrictions: args.ageRestrictions,
              amountMaximum: args.amountMaximum,
              userId: args.userId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    nest: {
      type: NestType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return Nests.find(nest => nest.id == args.id);
        return Nests.findById(args.id);
      },
    },
    user: {
      type: UsersType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return users.find(user => user.id == args.id);
        return Users.findById(args.id);
      },
    },
    nests: {
      type: new GraphQLList(NestType),
      args: { name: { type: GraphQLString } },
      resolve(parent, {name}) {
        //const allNests = Nests.find({}).count({})
        return Nests.find({name:{$regex:name, $options:"i"}});
        // Nests.find({}).length
      },
    },
    /*countTotalNests: {
        type: TotolCountType,
        resolve(parent, args) {
          //return nests;
          //const all = Nests.find({}).count({})
          return 11
        },
      },*/
    users: {
      type: new GraphQLList(UsersType),
      resolve(parent, args) {
        //return nests;
        return Users.find({});
      },
    },
    cura: {
        type: ToStringCura,
        resolve(parent, args) {
          return data.ToString();
        },
      },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
