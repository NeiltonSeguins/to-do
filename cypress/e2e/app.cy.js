describe("Aplicação de lista de tarefas (To-do) - React", () => {
  const tarefas = {
    item1: "Estudar HTML",
    item2: "Estudar CSS",
    item3: "Estudar JavaScript",
    item4: "Estudar React",
    item5: "Estudar MongoDB",
  };

  beforeEach(() => {
    cy.visit("/");
  });

  context("Verificando elementos e estilos", () => {
    it("Deve existir elementos na tela", function () {
      cy.get("h1").should("exist").contains("To-Do");
      cy.get(".campo__texto").should("exist");
      cy.get(".campo__texto").should("not.have.value");
      cy.get(".campo__texto").click().should("have.focus");
      cy.get(".botao").should("exist").and("have.text", "Adicionar");
    });
  });

  context("Não deve existir tarefas", function () {
    it("Não deve exibir nenhum elemento <li/> na aplicação", function () {
      cy.get("#lista-tarefas li").should("not.exist");
    });
  });

  context("Novas tarefas", () => {
    it("Deve permitir adicionar tarefas item por item", () => {
      cy.get(".campo__texto")
        .type(`${tarefas.item1}{enter}`)
        .type(`${tarefas.item2}{enter}`)
        .type(`${tarefas.item3}{enter}`)
        .type(`${tarefas.item4}{enter}`);

      cy.get("#lista-tarefas li").should("have.length", 4);
    });

    it("Deve apagar o texto do campo de input quando a tarefa for adicionada", function () {
      cy.get(".campo__texto").type(`${tarefas.item5}{enter}`);
      cy.get(".campo__texto").should("have.text", "");
    });

    it("Deve adicionar uma tarefa quando o botão for clicado", function () {
      cy.get(".campo__texto").type(`${tarefas.item5}`);
      cy.get(".botao").click();

      cy.get(".campo__texto").should("have.text", "");
    });
  });

  context("Interagindo com os itens da lista tarefas", () => {
    it("Deve permitir marcar uma tarefa como completa", () => {
      cy.get(".campo__texto")
        .type(`${tarefas.item1}{enter}`)
        .type(`${tarefas.item2}{enter}`);

      cy.get("#lista-tarefas li").eq(0).as("primeiraTarefa");
      cy.get("#lista-tarefas li").eq(1).as("segundaTarefa");

      cy.get("@primeiraTarefa").find("#completar-tarefa").click();
      cy.get("@primeiraTarefa")
        .find("p")
        .should(
          "have.css",
          "text-decoration",
          "line-through solid rgb(217, 217, 217)"
        );
      cy.get("@segundaTarefa").find("p").should("have.css", "display", "block");

      cy.get("@segundaTarefa").find("#completar-tarefa").click();
      cy.get("@primeiraTarefa")
        .find("p")
        .should(
          "have.css",
          "text-decoration",
          "line-through solid rgb(217, 217, 217)"
        );
      cy.get("@segundaTarefa")
        .find("p")
        .should(
          "have.css",
          "text-decoration",
          "line-through solid rgb(217, 217, 217)"
        );
    });

    it("Deve permitir deletar uma tarefa", () => {
      cy.get(".campo__texto")
        .type(`${tarefas.item5}{enter}`)
        .type(`${tarefas.item4}{enter}`);

      cy.get("#lista-tarefas li").should("have.length", 2);

      cy.get("#lista-tarefas li").eq(0).as("primeiraTarefa");
      cy.get("#lista-tarefas li").eq(1).as("segundaTarefa");

      cy.get("@primeiraTarefa").find("#deletar-tarefa").click();
      cy.get("#lista-tarefas li").should("have.length", 1);

      cy.get("@primeiraTarefa")
        .find("p")
        .should("have.text", `${tarefas.item4}`);
    });
  });
});
