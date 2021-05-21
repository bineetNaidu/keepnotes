import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MyContext } from 'src/utils/types';
import { APP_SECRET } from '../utils';

interface ArgsType {
  email: string;
  password: string;
}

interface NoteCreateArgs {
  title: string;
  details: string;
}

interface NoteUpdateArgs {
  id: string;
  data: {
    title: string;
    details: string;
  };
}

async function signup(_parent: any, args: ArgsType, context: MyContext) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { email: args.email, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(_parent: any, args: ArgsType, context: MyContext) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

const createNote = async (
  _parent: null,
  args: NoteCreateArgs,
  ctx: MyContext
) => {
  const uid = ctx.userId();

  if (!uid) {
    throw new Error('Not Authorized!');
  }

  const user = await ctx.prisma.user.findUnique({
    where: { id: Number(uid) },
  });
  if (!user) {
    throw new Error('User was Not Found!');
  }

  const note = ctx.prisma.note.create({
    data: {
      details: args.details,
      title: args.title,
      authorId: user.id,
    },
  });

  return note;
};

const updateNote = async (
  _parent: any,
  args: NoteUpdateArgs,
  ctx: MyContext
) => {
  const uid = ctx.userId();

  if (!uid) {
    throw new Error('Not Authorized!');
  }

  const user = await ctx.prisma.user.findUnique({
    where: { id: Number(uid) },
  });
  if (!user) {
    throw new Error('User was Not Found!');
  }

  const note = await ctx.prisma.note.update({
    data: args.data,
    where: { id: Number(args.id) },
  });

  if (!note) throw new Error('Note was Not Found');

  return note;
};

const deleteNote = async (
  _parent: any,
  args: { id: number },
  ctx: MyContext
) => {
  const uid = ctx.userId();

  if (!uid) {
    throw new Error('Not Authorized!');
  }

  const user = await ctx.prisma.user.findUnique({
    where: { id: Number(uid) },
  });
  if (!user) {
    throw new Error('User was Not Found!');
  }

  try {
    const note = await ctx.prisma.note.delete({
      where: { id: Number(args.id) },
    });

    if (!note) throw new Error('Note was Not Found');

    return true;
  } catch (e) {
    return false;
  }
};

export default {
  login,
  signup,
  createNote,
  updateNote,
  deleteNote,
};
