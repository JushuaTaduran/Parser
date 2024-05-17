import { Tokenizer, TokenType } from './Tokenizer'

class Parser {
  constructor() {
    this.input = ''
    this.tokenizer = new Tokenizer()
    this.lookahead = null
  }

  parse(inputString) {
    this.input = inputString
    this.tokenizer.init(inputString)
    this.lookahead = this.tokenizer.nextToken()
    return this.Assignment()
  }

  // Eliminates the current token if it matches the specified token type
  _elim(tokenType) {
    const token = this.lookahead

    console.log('Current token:', token)

    if (token == null) {
      throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}"`)
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token: "${token.value}", expected: "${tokenType}"`)
    }

    this.lookahead = this.tokenizer.nextToken()

    return token
  }

  // Parses an assignment statement
  Assignment() {
    const identifier = this.Identifier()
    const operator = this.AssignmentOperator()
    const expression = this.Expression()
    return {
      name: 'Assignment',
      children: [identifier, operator, expression]
    }
  }

  // Parses an assignment operator
  AssignmentOperator() {
    const operator = this._elim(TokenType.ASSIGNMENT)
    return {
      name: 'OPERATOR',
      attributes: {
        operator: operator.value
      }
    }
  }

  // Parses primary expressions
  // Identifier
  // Constants
  // Parenthesized Expression
  Primary() {
    console.log('Primary Method')
    console.log('Lookahead:', this.lookahead)

    switch (this.lookahead?.type) {
      case TokenType.NUMBER:
        console.log('Primary: Number')
        return this.Number()
      case TokenType.IDENTIFIER:
        console.log('Primary: Identifier')
        return this.Identifier()
      case TokenType.PARENTHESIS_LEFT:
        console.log('Primary: Parenthesized Expression')
        return this.ParenthesizedExpression()
      default:
        console.error('Primary: Unexpected token')
        throw new SyntaxError(`Unexpected token: ${this.lookahead?.value}`)
    }
  }

  // Parses term expressions
  Term() {
    console.log('Term Method')
    console.log('Lookahead:', this.lookahead)

    const primary = this.Primary()

    if (
      this.lookahead?.type === TokenType.MULTIPLICATION ||
      this.lookahead?.type === TokenType.DIVISION
    ) {
      console.log('Term: Multiplication or Division Operator')
      const operator = this.Operator()
      const term = this.Term()
      return {
        name: 'TERM',
        children: [primary, operator, term]
      }
    }

    console.log('Term: No Multiplication or Division Operator')
    return primary
  }

  // Parses expression
  Expression() {
    console.log('Expression Method')
    console.log('Lookahead:', this.lookahead)

    let term = this.Term()

    while (
      this.lookahead?.type === TokenType.ADDITION ||
      this.lookahead?.type === TokenType.SUBTRACTION
    ) {
      console.log('Expression: Addition or Subtraction Operator')
      const operator = this.Operator()
      const nextTerm = this.Term()
      term = {
        name: 'EXPRESSION',
        children: [term, operator, nextTerm]
      }
    }

    if (this.lookahead?.type === TokenType.PARENTHESIS_LEFT) {
      console.log('Expression: Parenthesized Expression')
      const parenthesizedExpr = this.ParenthesizedExpression()
      term = {
        name: 'EXPRESSION',
        children: [term, parenthesizedExpr]
      }
    }

    return term
  }

  // Parses parenthesized expressions
  ParenthesizedExpression() {
    this._elim(TokenType.PARENTHESIS_LEFT)
    const expression = this.Expression()
    this._elim(TokenType.PARENTHESIS_RIGHT)
    return expression
  }

  // Parses number literals
  Number() {
    const numberToken = this._elim(TokenType.NUMBER)
    return {
      name: 'CONSTANT',
      attributes: {
        value: numberToken.value
      }
    }
  }

  // Parses operator tokens
  // Additive Operators
  // Multiplicative Operators
  Operator() {
    let operatorToken = null

    if (
      this.lookahead?.type === TokenType.ADDITION ||
      this.lookahead?.type === TokenType.SUBTRACTION ||
      this.lookahead?.type === TokenType.MULTIPLICATION ||
      this.lookahead?.type === TokenType.DIVISION
    ) {
      operatorToken = this._elim(this.lookahead.type)
    }

    if (operatorToken === null) {
      throw new SyntaxError('Expected an operator token')
    }

    return {
      name: 'OPERATOR',
      attributes: {
        operator: operatorToken.value
      }
    }
  }

  // Parses identifier tokens
  Identifier() {
    const identifierToken = this._elim(TokenType.IDENTIFIER)
    return {
      name: 'IDENTIFIER',
      attributes: {
        value: identifierToken.value
      }
    }
  }
}

export default Parser
