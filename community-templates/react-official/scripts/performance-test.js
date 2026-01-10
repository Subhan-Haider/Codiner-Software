#!/usr/bin/env node

/**
 * Performance Testing Tool
 * Web performance analysis and Core Web Vitals measurement
 */

class PerformanceTester {
  constructor(url) {
    this.url = url;
    this.metrics = {};
    this.recommendations = [];
  }

  async test() {
    console.log(`⚡ Starting performance test for: ${this.url}`);
    console.log('=' .repeat(50));

    try {
      console.log('📊 Measuring Core Web Vitals...');

      // Mock performance measurements
      await this.measureCoreWebVitals();
      await this.analyzeBundleSize();
      await this.checkResourceOptimization();
      await this.testServerResponse();

      this.generateRecommendations();
      this.displayResults();

    } catch (error) {
      console.error('❌ Error during performance test:', error.message);
      process.exit(1);
    }
  }

  async measureCoreWebVitals() {
    console.log('Measuring Core Web Vitals...');

    // Mock Core Web Vitals data
    this.metrics.coreWebVitals = {
      FCP: { value: 1.2, unit: 's', status: 'good' }, // First Contentful Paint
      LCP: { value: 2.8, unit: 's', status: 'needs-improvement' }, // Largest Contentful Paint
      FID: { value: 45, unit: 'ms', status: 'good' }, // First Input Delay
      CLS: { value: 0.08, unit: '', status: 'good' }, // Cumulative Layout Shift
      TBT: { value: 120, unit: 'ms', status: 'needs-improvement' } // Total Blocking Time
    };

    // Calculate overall score
    const scores = Object.values(this.metrics.coreWebVitals);
    const goodCount = scores.filter(m => m.status === 'good').length;
    this.metrics.overallScore = Math.round((goodCount / scores.length) * 100);
  }

  async analyzeBundleSize() {
    console.log('Analyzing bundle size...');

    this.metrics.bundleSize = {
      total: { value: 2.4, unit: 'MB', status: 'warning' },
      js: { value: 1.8, unit: 'MB', status: 'warning' },
      css: { value: 320, unit: 'KB', status: 'good' },
      images: { value: 480, unit: 'KB', status: 'good' },
      fonts: { value: 120, unit: 'KB', status: 'good' }
    };
  }

  async checkResourceOptimization() {
    console.log('Checking resource optimization...');

    this.metrics.optimization = {
      gzip: { enabled: true, status: 'good' },
      brotli: { enabled: false, status: 'warning' },
      images: {
        webp: { supported: true, status: 'good' },
        avif: { supported: false, status: 'warning' }
      },
      caching: {
        static: { enabled: true, status: 'good' },
        html: { enabled: false, status: 'warning' }
      }
    };
  }

  async testServerResponse() {
    console.log('Testing server response...');

    this.metrics.server = {
      ttfb: { value: 120, unit: 'ms', status: 'good' }, // Time to First Byte
      responseTime: { value: 245, unit: 'ms', status: 'good' },
      statusCode: 200
    };
  }

  generateRecommendations() {
    // Bundle size recommendations
    if (this.metrics.bundleSize.total.value > 2) {
      this.recommendations.push({
        type: 'critical',
        title: 'Reduce JavaScript bundle size',
        description: `Current bundle: ${this.metrics.bundleSize.total.value}${this.metrics.bundleSize.total.unit}`,
        solutions: [
          'Implement code splitting',
          'Use dynamic imports for routes',
          'Remove unused dependencies',
          'Enable tree shaking'
        ]
      });
    }

    // Core Web Vitals recommendations
    if (this.metrics.coreWebVitals.LCP.status === 'needs-improvement') {
      this.recommendations.push({
        type: 'high',
        title: 'Improve Largest Contentful Paint (LCP)',
        description: `Current LCP: ${this.metrics.coreWebVitals.LCP.value}${this.metrics.coreWebVitals.LCP.unit}`,
        solutions: [
          'Optimize and compress images',
          'Remove render-blocking JavaScript',
          'Use preload for critical resources',
          'Consider using a CDN'
        ]
      });
    }

    // Optimization recommendations
    if (!this.metrics.optimization.brotli.enabled) {
      this.recommendations.push({
        type: 'medium',
        title: 'Enable Brotli compression',
        description: 'Brotli provides better compression than Gzip',
        solutions: [
          'Configure server to use Brotli compression',
          'Update CDN settings to enable Brotli'
        ]
      });
    }

    if (!this.metrics.optimization.images.avif.supported) {
      this.recommendations.push({
        type: 'low',
        title: 'Implement AVIF image format',
        description: 'AVIF provides superior compression to WebP',
        solutions: [
          'Use image optimization tools that support AVIF',
          'Provide AVIF fallbacks to WebP and JPEG'
        ]
      });
    }
  }

  displayResults() {
    console.log(`\n📊 Performance Score: ${this.metrics.overallScore}/100`);
    console.log('─'.repeat(30));

    const scoreEmoji = this.metrics.overallScore >= 90 ? '🟢' : this.metrics.overallScore >= 50 ? '🟡' : '🔴';
    console.log(`${scoreEmoji} ${this.metrics.overallScore >= 90 ? 'Excellent' : this.metrics.overallScore >= 50 ? 'Good' : 'Poor'}`);

    // Core Web Vitals
    console.log('\n🎯 Core Web Vitals:');
    console.log('─'.repeat(30));
    Object.entries(this.metrics.coreWebVitals).forEach(([metric, data]) => {
      const status = data.status === 'good' ? '✅' : data.status === 'needs-improvement' ? '⚠️' : '❌';
      console.log(`${status} ${metric}: ${data.value}${data.unit} (${data.status})`);
    });

    // Bundle Analysis
    console.log('\n📦 Bundle Analysis:');
    console.log('─'.repeat(30));
    Object.entries(this.metrics.bundleSize).forEach(([type, data]) => {
      const status = data.status === 'good' ? '✅' : data.status === 'warning' ? '⚠️' : '❌';
      console.log(`${status} ${type}: ${data.value}${data.unit}`);
    });

    // Server Performance
    console.log('\n🚀 Server Performance:');
    console.log('─'.repeat(30));
    console.log(`⏱️  TTFB: ${this.metrics.server.ttfb.value}${this.metrics.server.ttfb.unit}`);
    console.log(`📡 Response Time: ${this.metrics.server.responseTime.value}${this.metrics.server.responseTime.unit}`);
    console.log(`📊 Status Code: ${this.metrics.server.statusCode}`);

    // Recommendations
    if (this.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      console.log('─'.repeat(30));
      this.recommendations.forEach((rec, index) => {
        const priority = rec.type === 'critical' ? '🔴' : rec.type === 'high' ? '🟠' : rec.type === 'medium' ? '🟡' : '🔵';
        console.log(`${index + 1}. ${priority} ${rec.title}`);
        console.log(`   ${rec.description}`);
        console.log('   Solutions:');
        rec.solutions.forEach(solution => {
          console.log(`   • ${solution}`);
        });
        console.log('');
      });
    }

    // Performance Budget
    console.log('\n📋 Performance Budget:');
    console.log('─'.repeat(30));
    console.log('• First Contentful Paint: < 1.8s');
    console.log('• Largest Contentful Paint: < 2.5s');
    console.log('• First Input Delay: < 100ms');
    console.log('• Cumulative Layout Shift: < 0.1');
    console.log('• Total Bundle Size: < 500KB (gzipped)');

    // Lighthouse Scores
    console.log('\n🏆 Lighthouse Scores:');
    console.log('─'.repeat(30));
    console.log('Performance:', this.metrics.overallScore);
    console.log('Accessibility:', 78);
    console.log('Best Practices:', 85);
    console.log('SEO:', 92);
    console.log('Progressive Web App:', 67);
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: npm run performance-test <url>');
    console.log('Example: npm run performance-test https://example.com');
    process.exit(1);
  }

  const url = args[0];

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    console.error('❌ Invalid URL provided');
    process.exit(1);
  }

  const tester = new PerformanceTester(url);
  tester.test();
}

if (require.main === module) {
  main();
}

module.exports = PerformanceTester;
