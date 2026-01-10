import { Component } from 'solid-js';

const About: Component = () => {
  return (
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold mb-8">About SolidJS</h1>
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <p class="text-xl text-muted-foreground mb-6">
          SolidJS is a declarative JavaScript library for building user interfaces.
          It compiles to vanilla JavaScript and provides fine-grained reactivity.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li><strong>Fine-grained reactivity:</strong> Only re-renders what actually changes</li>
          <li><strong>Zero runtime overhead:</strong> Compiles to vanilla JavaScript</li>
          <li><strong>Performance:</strong> One of the fastest frontend frameworks</li>
          <li><strong>Developer experience:</strong> Familiar React-like API with better performance</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
