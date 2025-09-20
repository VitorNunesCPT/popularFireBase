# Popular Firebase - Projeto de População do Firestore

Este projeto permite popular o banco de dados Firestore com dados da coleção `infoCards` sobre tuberculose.

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Firebase
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Vá em "Configurações do projeto" > "Contas de serviço"
4. Clique em "Gerar nova chave privada"
5. Baixe o arquivo JSON e renomeie para `serviceAccountKey.json`
6. Coloque o arquivo na raiz do projeto

### 3. Atualizar configuração
Edite o arquivo `firebase-config.js` e substitua `'seu-project-id'` pelo ID do seu projeto Firebase.

## Como usar

### Comandos disponíveis:

```bash
# Popular a coleção com os dados
node populate-firestore.js populate

# Listar todos os documentos da coleção
node populate-firestore.js list

# Limpar todos os documentos da coleção
node populate-firestore.js clear

# Limpar e popular novamente
node populate-firestore.js reset

# Ver ajuda
node populate-firestore.js
```

## Estrutura dos dados

A coleção `infoCards` contém 11 documentos com informações sobre tuberculose:

1. **Sinais e Sintomas** - Essencial (danger)
2. **Transmissão** - Importante (info)
3. **Diagnóstico** - Fundamental (blue)
4. **Sobre o Tratamento** - Fundamental (success)
5. **Reações Adversas** - Atenção (warning)
6. **Interações Medicamentosas** - Cuidado (purple)
7. **Reações da Tuberculose** - Informativo (orange)
8. **Dicas de Autocuidado** - Prático (pink)
9. **Prevenção** - Preventivo (teal)
10. **TB-HIV (Coinfecção)** - Especializado (red)
11. **Epidemiologia** - Contextual (blue)

Cada documento contém:
- `title`: Título do card
- `description`: Descrição do conteúdo
- `iconName`: Nome do ícone (Lucide React)
- `status`: Status/categoria do card
- `theme`: Tema de cores
- `order`: Ordem de exibição
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Segurança

⚠️ **IMPORTANTE**: Nunca commite o arquivo `serviceAccountKey.json` no Git. Este arquivo contém credenciais sensíveis.

Adicione ao seu `.gitignore`:
```
serviceAccountKey.json
```