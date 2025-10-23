# Referência de API - Funções Disponíveis

> **Documentação completa das funções em `auth-integration.js`**

Este documento detalha todas as funções prontas para uso no seu aplicativo.

---

## 📚 Índice

- [Gerenciamento de Perfil](#gerenciamento-de-perfil)
- [Medicamentos](#medicamentos)
- [Sintomas](#sintomas)
- [Registros de Dose](#registros-de-dose)
- [Queries Avançadas](#queries-avançadas)
- [Tratamento de Erros](#tratamento-de-erros)

---

## Gerenciamento de Perfil

### `createUserProfile(userId, userData)`

Cria o perfil do usuário no Firestore após registro no Authentication.

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `userId` | `string` | ✅ | UID do usuário (vindo do Authentication) |
| `userData` | `object` | ✅ | Dados do perfil |
| `userData.nome` | `string` | ✅ | Nome completo do usuário |
| `userData.email` | `string` | ✅ | Email do usuário |
| `userData.telefone` | `string` | ❌ | Telefone (opcional) |
| `userData.dataNascimento` | `string` | ❌ | Data no formato "YYYY-MM-DD" |
| `userData.fotoURL` | `string` | ❌ | URL da foto de perfil |

**Retorna:** `Promise<void>`

**Exemplo:**
```javascript
import { createUserProfile } from './services/firebase';

await createUserProfile('abc123uid', {
  nome: "João Silva",
  email: "joao@email.com",
  telefone: "+55 11 98765-4321",
  dataNascimento: "1985-03-15"
});
```

**Estrutura criada no Firestore:**
```
/users/abc123uid
  ├── nome: "João Silva"
  ├── email: "joao@email.com"
  ├── telefone: "+55 11 98765-4321"
  ├── dataNascimento: "1985-03-15"
  ├── fotoURL: null
  ├── criadoEm: Timestamp
  └── atualizadoEm: Timestamp
```

---

### `getUserProfile(userId)`

Busca o perfil completo do usuário.

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `userId` | `string` | ✅ | UID do usuário |

**Retorna:** `Promise<object | null>`

**Exemplo:**
```javascript
const profile = await getUserProfile('abc123uid');

if (profile) {
  console.log(profile.nome);    // "João Silva"
  console.log(profile.email);   // "joao@email.com"
} else {
  console.log('Usuário não encontrado');
}
```

**Resposta:**
```javascript
{
  id: "abc123uid",
  nome: "João Silva",
  email: "joao@email.com",
  telefone: "+55 11 98765-4321",
  dataNascimento: "1985-03-15",
  fotoURL: null,
  criadoEm: Timestamp,
  atualizadoEm: Timestamp
}
```

---

### `updateUserProfile(userId, updates)`

Atualiza campos do perfil do usuário.

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `userId` | `string` | ✅ | UID do usuário |
| `updates` | `object` | ✅ | Campos a atualizar |

**Retorna:** `Promise<void>`

**Exemplo:**
```javascript
await updateUserProfile('abc123uid', {
  telefone: "+55 11 91234-5678",
  fotoURL: "https://storage.googleapis.com/..."
});
```

**⚠️ Nota:** Atualiza automaticamente o campo `atualizadoEm`.

---

### `deleteUserProfile(userId)`

Remove o perfil do usuário e **TODAS** suas subcoleções (irreversível!).

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `userId` | `string` | ✅ | UID do usuário |

**Retorna:** `Promise<void>`

**Exemplo:**
```javascript
// Confirmar antes de executar!
if (confirm('Tem certeza? Isso é irreversível!')) {
  await deleteUserProfile('abc123uid');
}
```

**O que é removido:**
- Documento `/users/{userId}`
- Todos os medicamentos
- Todos os sintomas
- Todos os registros de dose

**⚠️ ATENÇÃO:** Esta função NÃO remove o usuário do Authentication. Para remover completamente:
```javascript
// 1. Remover do Firestore
await deleteUserProfile(user.uid);

// 2. Remover do Authentication
await user.delete();
```

---

## Medicamentos

### `addMedicamento(userId, medicamentoData)`

Adiciona um medicamento ao perfil do usuário.

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `userId` | `string` | ✅ | UID do usuário |
| `medicamentoData` | `object` | ✅ | Dados do medicamento |
| `medicamentoData.nome` | `string` | ✅ | Nome do medicamento |
| `medicamentoData.dosagem` | `string` | ✅ | Dose (ex: "600mg") |
| `medicamentoData.frequencia` | `string` | ❌ | "diaria", "semanal", "personalizada" (padrão: "diaria") |
| `medicamentoData.horarios` | `array` | ✅ | Array de horários (ex: ["08:00", "20:00"]) |
| `medicamentoData.observacoes` | `string` | ❌ | Observações importantes |
| `medicamentoData.dataInicio` | `Date` | ❌ | Data de início (padrão: now) |
| `medicamentoData.dataFim` | `Date` | ❌ | Data de término (padrão: null) |

**Retorna:** `Promise<string>` (ID do medicamento criado)

**Exemplo:**
```javascript
const medId = await addMedicamento('abc123uid', {
  nome: "Rifampicina",
  dosagem: "600mg",
  frequencia: "diaria",
  horarios: ["08:00", "20:00"],
  observacoes: "Tomar com alimentos",
  dataInicio: new Date("2025-10-01"),
  dataFim: new Date("2026-04-01")  // 6 meses depois
});

console.log('Medicamento criado:', medId);
```

**Estrutura no Firestore:**
```
/users/abc123uid/medicamentos/{medId}
  ├── nome: "Rifampicina"
  ├── dosagem: "600mg"
  ├── frequencia: "diaria"
  ├── horarios: ["08:00", "20:00"]
  ├── observacoes: "Tomar com alimentos"
  ├── dataInicio: Timestamp(2025-10-01)
  ├── dataFim: Timestamp(2026-04-01)
  └── criadoEm: Timestamp
```

---

### Queries de Medicamentos (usar diretamente no app)

**Listar todos os medicamentos do usuário:**
```javascript
const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('medicamentos')
  .orderBy('criadoEm', 'desc')
  .get();

const medicamentos = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

**Buscar medicamentos ativos (que ainda não terminaram):**
```javascript
const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('medicamentos')
  .where('dataFim', '>=', new Date())
  .get();
```

**Buscar medicamento por ID:**
```javascript
const doc = await db
  .collection('users')
  .doc(userId)
  .collection('medicamentos')
  .doc(medId)
  .get();

if (doc.exists) {
  const medicamento = { id: doc.id, ...doc.data() };
}
```

**Atualizar medicamento:**
```javascript
await db
  .collection('users')
  .doc(userId)
  .collection('medicamentos')
  .doc(medId)
  .update({
    dosagem: "800mg",
    horarios: ["09:00", "21:00"]
  });
```

**Excluir medicamento:**
```javascript
await db
  .collection('users')
  .doc(userId)
  .collection('medicamentos')
  .doc(medId)
  .delete();
```

---

## Sintomas

### `addSintoma(userId, sintomaData)`

Registra um sintoma do usuário.

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `userId` | `string` | ✅ | UID do usuário |
| `sintomaData` | `object` | ✅ | Dados do sintoma |
| `sintomaData.data` | `Date` | ❌ | Data do sintoma (padrão: now) |
| `sintomaData.descricao` | `string` | ✅ | Descrição do sintoma |
| `sintomaData.intensidade` | `string` | ❌ | "baixa", "media", "alta" (padrão: "media") |
| `sintomaData.observacoes` | `string` | ❌ | Observações adicionais |

**Retorna:** `Promise<string>` (ID do sintoma criado)

**Exemplo:**
```javascript
const sintomaId = await addSintoma('abc123uid', {
  data: new Date(),
  descricao: "Tosse seca persistente, febre baixa (37.8°C)",
  intensidade: "media",
  observacoes: "Piorou durante a noite"
});
```

**Estrutura no Firestore:**
```
/users/abc123uid/sintomas/{sintomaId}
  ├── data: Timestamp
  ├── descricao: "Tosse seca persistente..."
  ├── intensidade: "media"
  ├── observacoes: "Piorou durante a noite"
  └── criadoEm: Timestamp
```

---

### Queries de Sintomas

**Buscar sintomas de um mês específico:**
```javascript
const iniciodoMes = new Date(2025, 9, 1);  // Outubro/2025
const fimDoMes = new Date(2025, 9, 31, 23, 59, 59);

const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('sintomas')
  .where('data', '>=', iniciodoMes)
  .where('data', '<=', fimDoMes)
  .orderBy('data', 'desc')
  .get();
```

**Buscar sintomas de um dia específico:**
```javascript
const inicioDoDia = new Date(2025, 9, 15, 0, 0, 0);
const fimDoDia = new Date(2025, 9, 15, 23, 59, 59);

const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('sintomas')
  .where('data', '>=', inicioDoDia)
  .where('data', '<=', fimDoDia)
  .get();
```

**Buscar sintomas por intensidade:**
```javascript
const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('sintomas')
  .where('intensidade', '==', 'alta')
  .orderBy('data', 'desc')
  .limit(10)
  .get();
```

**Contar sintomas do mês:**
```javascript
const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('sintomas')
  .where('data', '>=', iniciodoMes)
  .where('data', '<=', fimDoMes)
  .get();

const totalSintomas = snapshot.size;
```

---

## Registros de Dose

### `addRegistroDose(userId, registroData)`

Registra uma dose de medicamento (tomado ou pulado).

**Parâmetros:**
| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `userId` | `string` | ✅ | UID do usuário |
| `registroData` | `object` | ✅ | Dados do registro |
| `registroData.medicamentoId` | `string` | ✅ | ID do medicamento (não o path completo) |
| `registroData.nomeMedicamento` | `string` | ✅ | Nome (denormalizado) |
| `registroData.dosagem` | `string` | ✅ | Dosagem (denormalizada) |
| `registroData.horarioAgendado` | `Date` | ✅ | Horário previsto |
| `registroData.horarioTomado` | `Date` | ❌ | Horário real (null se pulado) |
| `registroData.status` | `string` | ✅ | "tomado" ou "pulado" |

**Retorna:** `Promise<string>` (ID do registro criado)

**Exemplo - Marcar como tomado:**
```javascript
await addRegistroDose('abc123uid', {
  medicamentoId: "med_001",
  nomeMedicamento: "Rifampicina",
  dosagem: "600mg",
  horarioAgendado: new Date("2025-10-23T08:00:00"),
  horarioTomado: new Date(),  // Agora
  status: "tomado"
});
```

**Exemplo - Marcar como pulado:**
```javascript
await addRegistroDose('abc123uid', {
  medicamentoId: "med_001",
  nomeMedicamento: "Rifampicina",
  dosagem: "600mg",
  horarioAgendado: new Date("2025-10-23T20:00:00"),
  horarioTomado: null,
  status: "pulado"
});
```

**Estrutura no Firestore:**
```
/users/abc123uid/registrosDeDose/{registroId}
  ├── medicamentoRef: "/users/abc123uid/medicamentos/med_001"
  ├── nomeMedicamento: "Rifampicina"
  ├── dosagem: "600mg"
  ├── horarioAgendado: Timestamp(2025-10-23 08:00)
  ├── horarioTomado: Timestamp(2025-10-23 08:05) ou null
  └── status: "tomado" ou "pulado"
```

---

### Queries de Registros

**Verificar se já existe registro para um horário:**
```javascript
const horarioAgendado = new Date("2025-10-23T08:00:00");

const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('registrosDeDose')
  .where('horarioAgendado', '==', horarioAgendado)
  .limit(1)
  .get();

const jaRegistrado = !snapshot.empty;
```

**Buscar registros de hoje:**
```javascript
const inicioDoDia = new Date();
inicioDoDia.setHours(0, 0, 0, 0);

const fimDoDia = new Date();
fimDoDia.setHours(23, 59, 59, 999);

const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('registrosDeDose')
  .where('horarioAgendado', '>=', inicioDoDia)
  .where('horarioAgendado', '<=', fimDoDia)
  .orderBy('horarioAgendado', 'asc')
  .get();
```

**Calcular taxa de adesão:**
```javascript
// Total de registros
const totalSnapshot = await db
  .collection('users')
  .doc(userId)
  .collection('registrosDeDose')
  .get();

const total = totalSnapshot.size;

// Registros tomados
const tomadosSnapshot = await db
  .collection('users')
  .doc(userId)
  .collection('registrosDeDose')
  .where('status', '==', 'tomado')
  .get();

const tomados = tomadosSnapshot.size;

// Calcular adesão
const taxaAdesao = total > 0 ? (tomados / total) * 100 : 0;
console.log(`Adesão: ${taxaAdesao.toFixed(1)}%`);
```

**Buscar últimos N registros:**
```javascript
const snapshot = await db
  .collection('users')
  .doc(userId)
  .collection('registrosDeDose')
  .orderBy('horarioAgendado', 'desc')
  .limit(20)
  .get();
```

---

## Queries Avançadas

### Buscar lembretes do dia (lógica completa)

```javascript
async function getLembretesDodia(userId) {
  // 1. Buscar medicamentos ativos
  const medSnapshot = await db
    .collection('users')
    .doc(userId)
    .collection('medicamentos')
    .where('dataFim', '>=', new Date())
    .get();

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const amanha = new Date(hoje);
  amanha.setDate(amanha.getDate() + 1);

  const lembretes = [];

  for (const medDoc of medSnapshot.docs) {
    const med = medDoc.data();

    // Para cada horário do medicamento
    for (const horario of med.horarios) {
      const [hora, minuto] = horario.split(':');
      const horarioAgendado = new Date(hoje);
      horarioAgendado.setHours(parseInt(hora), parseInt(minuto), 0, 0);

      // Verificar se já foi registrado
      const regSnapshot = await db
        .collection('users')
        .doc(userId)
        .collection('registrosDeDose')
        .where('horarioAgendado', '==', horarioAgendado)
        .limit(1)
        .get();

      let status = 'pendente';
      if (!regSnapshot.empty) {
        status = regSnapshot.docs[0].data().status;
      }

      lembretes.push({
        medicamentoId: medDoc.id,
        nome: med.nome,
        dosagem: med.dosagem,
        horario: horario,
        horarioAgendado: horarioAgendado,
        status: status
      });
    }
  }

  // Ordenar por horário
  lembretes.sort((a, b) => a.horarioAgendado - b.horarioAgendado);

  return lembretes;
}
```

---

## Tratamento de Erros

Todas as funções lançam erros que devem ser tratados:

```javascript
try {
  await createUserProfile(userId, userData);
} catch (error) {
  if (error.code === 'permission-denied') {
    console.error('Sem permissão para criar perfil');
  } else if (error.code === 'already-exists') {
    console.error('Perfil já existe');
  } else {
    console.error('Erro desconhecido:', error);
  }
}
```

### Códigos de Erro Comuns

| Código | Descrição | Solução |
|--------|-----------|---------|
| `permission-denied` | Sem permissão | Verificar regras do Firestore |
| `not-found` | Documento não existe | Verificar se ID está correto |
| `already-exists` | Documento já existe | Usar update ao invés de create |
| `unauthenticated` | Usuário não autenticado | Fazer login antes |
| `unavailable` | Serviço indisponível | Retry com backoff exponencial |

---

## Constantes e Enums

### Intensidades de Sintomas
```javascript
const INTENSIDADES = {
  BAIXA: 'baixa',
  MEDIA: 'media',
  ALTA: 'alta'
};
```

### Status de Registro
```javascript
const STATUS_REGISTRO = {
  TOMADO: 'tomado',
  PULADO: 'pulado'
};
```

### Frequências de Medicamento
```javascript
const FREQUENCIAS = {
  DIARIA: 'diaria',
  SEMANAL: 'semanal',
  PERSONALIZADA: 'personalizada'
};
```

---

**Documentação completa!** Use este arquivo como referência rápida durante o desenvolvimento.
