import { MyContext } from 'src/utils/types';

const me = async (_parent: null, __args: null, ctx: MyContext) => {
  const id = ctx.userId();

  if (id) {
    const user = await ctx.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new Error('User was Not Found!');
    }

    return {
      id: user.id,
      email: user.email,
      notes: user.password,
    };
  } else {
    return null;
  }
};

const myNotes = async (_parent: null, __args: null, ctx: MyContext) => {
  const uid = ctx.userId();
  const user = await ctx.prisma.user.findUnique({
    where: { id: Number(uid) },
  });
  if (!user) {
    throw new Error('User was Not Found!');
  }

  const notes = ctx.prisma.note.findMany({
    where: {
      authorId: user.id,
    },
  });

  return notes;
};

export default { me, myNotes };
