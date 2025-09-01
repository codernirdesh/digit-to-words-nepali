import { ConverterConfig } from '../types/converterTypes';
import { BaseConverter } from '../converters/baseConverter';

/**
 * ConverterFactory
 * Singleton factory for creating and reusing converter instances.
 * Ensures only one instance per converter class for performance.
 */
export class ConverterFactory {
  private static instances: Map<string, BaseConverter> = new Map();

  /**
   * Get or create an instance of a converter.
   * @param className The class name of the converter
   * @param creator Factory function to create a new instance if needed
   */
  static getInstance<T extends BaseConverter>(className: string, creator: () => T): T {
    if (!this.instances.has(className)) {
      this.instances.set(className, creator());
    }
    return this.instances.get(className) as T;
  }

  /**
   * Clear all cached instances (useful for testing)
   */
  static clearInstances(): void {
    this.instances.clear();
  }
}
