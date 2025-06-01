import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <div id="portal-1" />
          <div id="portal-2" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
