// cypress/e2e/llm_prompt.cy.ts
describe('LLM Tree Query Test', () => {
  it('displays children from LLM prompt', () => {
    cy.intercept('POST', '/nlp/tree-query').as('llmQuery'); 

    cy.visit('/');

    cy.get('[data-testid="prompt-input"]').type('Show me all animals under root');
    cy.contains('Ask LLM').click();

    cy.wait('@llmQuery');

    cy.contains('bear');
    cy.contains('elephant');
    cy.contains('giraffe');
  });
});
