import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICTX } from './auth.dto';

export const CurrentCtx = createParamDecorator(
  (_: unknown, context: ExecutionContext): ICTX | Error => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    const { token } = ctx.getContext();
    let ip = (
      request.req.headers['x-forwarded-for'] ||
      request.req.connection.remoteAddress
    )?.split(',')[0];
    const { user } = request.body;
    let relations = getRelations(context);

    if (relations.length >= 15) {
      relations = [];
    }

    if (ip?.substr(0, 7) === '::ffff:') {
      ip = ip.substr(7);
    }

    if (ip === '::1') {
      ip = '127.0.0.1';
    }

    return { user, ipAddress: ip, relations, token };
  },
);

function getRelations(context: ExecutionContext) {
  const { fieldNodes } = context.getArgByIndex(3) || {};
  const fn = (nodes, name?: string): string[] =>
    nodes.reduce((acc, node) => {
      if (Boolean(node.selectionSet)) {
        const value = name ? `${name}.${node.name.value}` : node.name.value;
        const newValue = value.replace('items.', '');
        const childNode = node?.selectionSet?.selections;
        return [...acc, newValue, ...fn(childNode, newValue)];
      }
      return acc;
    }, []);

  return fn(fieldNodes[0].selectionSet?.selections || []).filter(
    (item) =>
      !item.includes('logo') &&
      !item.includes('items') &&
      !item.includes('meta') &&
      !item.includes('Resolve'),
  );
}
