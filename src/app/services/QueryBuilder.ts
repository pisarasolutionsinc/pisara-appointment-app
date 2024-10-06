export class QueryBuilder {
  private query: Record<string, any>;

  constructor() {
    this.query = {};
  }

  // Add fields to select
  select(fields: string[]): this {
    this.query.select = fields.join(" ");
    return this;
  }

  // Add sorting options
  sort(fields: string | string[]): this {
    this.query.sort = Array.isArray(fields) ? fields.join(" ") : fields;
    return this;
  }

  // Set the limit for results
  limit(count: number): this {
    this.query.limit = count;
    return this;
  }

  // Add population options
  populate(fields: string[]): this {
    this.query.populate = fields.join(" ");
    return this;
  }

  // Add any other custom query params
  setParam(key: string, value: any): this {
    this.query[key] = value;
    return this;
  }

  // Get the query object or query string
  build(asString: boolean = false): string | Record<string, any> {
    if (asString) {
      const params = new URLSearchParams(this.query);
      return params.toString();
    }
    return this.query;
  }
}
