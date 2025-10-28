# Guia de Implementação - Módulos de Tratamento

> **Documento de referência para implementação dos módulos faltantes no app de acompanhamento de tuberculose**

---

## 📊 Estado Atual da Aplicação

### ✅ O que JÁ está implementado:

#### 1. Módulo Auth (`modules/auth/`)
```
modules/auth/
├── components/
│   ├── Button.tsx          ✅ Componente de botão reutilizável
│   └── Input.tsx           ✅ Input com ícones, validação e senha
├── hooks/
│   ├── useAuth.ts          ✅ Hook para verificar auth state
│   ├── useLogin.ts         ✅ Hook para login (React Query)
│   └── useLogout.ts        ✅ Hook para logout
├── services/
│   ├── auth.service.ts     ✅ Serviço de autenticação
│   └── firebase.config.ts  ✅ Config do Firebase + persistência
├── utils/
│   └── schemas.ts          ✅ Schemas Zod para validação
├── view/
│   └── LoginScreen.tsx     ✅ Tela de login completa
└── index.ts                ✅ Exports públicos
```

**Funcionalidades:**
- ✅ Login com email/senha
- ✅ Logout
- ✅ Proteção de rotas (redirect automático)
- ✅ Validação de formulário com Zod
- ✅ Estados de loading
- ✅ Tratamento de erros
- ✅ Persistência com AsyncStorage

---

#### 2. Módulo Info (`modules/info/`)
```
modules/info/
├── components/
│   ├── DetailItem.tsx      ✅ Item de detalhe
│   └── InfoCard.tsx        ✅ Card de info com tema
├── hooks/
│   ├── useInfoCardDetail.ts ✅ Hook para detalhes
│   └── useInfoCards.ts     ✅ Hook para listar cards
├── services/
│   └── firestore.service.ts ✅ Serviço Firestore
├── utils/
│   ├── dataHelpers.ts      ✅ Helpers para dados
│   ├── themeColors.ts      ✅ Cores por tema
│   └── types.ts            ✅ Types TypeScript
├── view/
│   ├── InfoDetailScreen.tsx ✅ Tela de detalhes
│   └── InfoListScreen.tsx  ✅ Tela de listagem
└── index.ts                ✅ Exports
```

**Funcionalidades:**
- ✅ Listagem de InfoCards do Firestore
- ✅ Ordenação por `order`
- ✅ React Query com cache (5 min)
- ✅ Cores temáticas dinâmicas
- ✅ Loading/Error/Empty states
- ✅ Pull to refresh
- ✅ Navegação para detalhes

---

#### 3. Navegação (Expo Router)
```
app/
├── _layout.tsx             ✅ Root layout com React Query
├── login.tsx               ✅ Rota de login
├── (tabs)/
│   ├── _layout.tsx         ✅ Tabs layout
│   ├── index.tsx           ✅ Home (com logout)
│   ├── info.tsx            ✅ InfoCards
│   ├── calendar.tsx        ❌ Placeholder
│   ├── reminders.tsx       ❌ Placeholder
│   └── calculator.tsx      ❌ Placeholder
└── infoCards/
    └── [id].tsx            ✅ Detalhes do card
```

**Funcionalidades:**
- ✅ Roteamento file-based
- ✅ Proteção de rotas (useAuth + redirect)
- ✅ Tabs com ícones
- ✅ Dark/Light mode
- ✅ Typed routes habilitado

---

## ❌ O que FALTA implementar:

### 1. 🔴 CRÍTICO: Integração Auth → Firestore
**Problema atual:** Quando usuário faz login, não cria/busca perfil no Firestore

**O que fazer:**
- Criar `modules/auth/services/profile.service.ts`
- Modificar `useLogin.ts` para criar perfil após login
- Buscar perfil existente ou criar novo

---

### 2. 💊 Módulo Reminders (Medicamentos)
**Status:** Não implementado

**Funcionalidades necessárias:**
- Listar medicamentos do usuário
- Adicionar novo medicamento
- Gerar lembretes do dia
- Marcar dose como tomada/pulada
- Calcular taxa de adesão

---

### 3. 📅 Módulo Calendar (Sintomas)
**Status:** Não implementado

**Funcionalidades necessárias:**
- Calendário visual
- Registrar sintoma
- Ver sintomas por dia
- Estatísticas do mês
- Cores por intensidade

---

## 🎯 Plano de Implementação Detalhado

---

## FASE 1: Integração Auth + Firestore Profile

### 📋 Checklist

- [ ] Criar `modules/auth/services/profile.service.ts`
- [ ] Criar `modules/auth/types/profile.types.ts`
- [ ] Modificar `modules/auth/hooks/useLogin.ts`
- [ ] Criar `modules/auth/hooks/useProfile.ts`
- [ ] Testar criação de perfil
- [ ] Atualizar `modules/auth/index.ts`

---

### 1.1. Criar Types de Profile

**Arquivo:** `modules/auth/types/profile.types.ts`

```typescript
import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  nome: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  fotoURL?: string;
  criadoEm: Timestamp;
  atualizadoEm: Timestamp;
}

export interface CreateProfileData {
  nome: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
}
```

---

### 1.2. Criar Profile Service

**Arquivo:** `modules/auth/services/profile.service.ts`

```typescript
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase.config';
import type { UserProfile, CreateProfileData } from '../types/profile.types';

export const profileService = {
  /**
   * Busca o perfil do usuário no Firestore
   */
  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const profileRef = doc(db, 'users', userId);
      const profileDoc = await getDoc(profileRef);

      if (!profileDoc.exists()) {
        return null;
      }

      return {
        uid: profileDoc.id,
        ...profileDoc.data(),
      } as UserProfile;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw new Error('Não foi possível buscar o perfil');
    }
  },

  /**
   * Cria ou atualiza o perfil do usuário
   */
  async createOrUpdateProfile(
    userId: string,
    data: CreateProfileData
  ): Promise<void> {
    try {
      const profileRef = doc(db, 'users', userId);
      const profileDoc = await getDoc(profileRef);

      if (profileDoc.exists()) {
        // Se já existe, apenas atualiza
        await setDoc(
          profileRef,
          {
            ...data,
            atualizadoEm: Timestamp.now(),
          },
          { merge: true }
        );
      } else {
        // Se não existe, cria novo
        await setDoc(profileRef, {
          ...data,
          criadoEm: Timestamp.now(),
          atualizadoEm: Timestamp.now(),
        });
      }
    } catch (error) {
      console.error('Erro ao criar/atualizar perfil:', error);
      throw new Error('Não foi possível salvar o perfil');
    }
  },
};
```

---

### 1.3. Criar Hook useProfile

**Arquivo:** `modules/auth/hooks/useProfile.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { profileService } from '../services/profile.service';

export const useProfile = (userId: string | null) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => {
      if (!userId) throw new Error('User ID is required');
      return profileService.getProfile(userId);
    },
    enabled: !!userId, // Só executa se tiver userId
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};
```

---

### 1.4. Modificar useLogin

**Arquivo:** `modules/auth/hooks/useLogin.ts` (MODIFICAR)

```typescript
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { profileService } from '../services/profile.service';
import type { LoginFormData } from '../utils/schemas';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      // 1. Faz login
      const authResponse = await authService.login(credentials);

      // 2. Busca ou cria perfil no Firestore
      const profile = await profileService.getProfile(authResponse.user.uid);

      if (!profile) {
        // Se não existe perfil, cria um básico
        await profileService.createOrUpdateProfile(authResponse.user.uid, {
          nome: authResponse.user.displayName || 'Usuário',
          email: authResponse.user.email || credentials.email,
        });
      }

      return authResponse;
    },
    onSuccess: (data) => {
      console.log('Login successful', data.user.email);
    },
    onError: (error: any) => {
      console.error('Login error:', error.message);
    },
  });
};
```

---

### 1.5. Atualizar Exports

**Arquivo:** `modules/auth/index.ts` (ADICIONAR)

```typescript
// ... exports existentes

// Services
export * from './services/profile.service';

// Types
export * from './types/profile.types';

// Hooks
export * from './hooks/useProfile';
```

---

## FASE 2: Módulo Reminders (Medicamentos)

### 📋 Checklist

- [ ] Criar estrutura de pastas `modules/reminders/`
- [ ] Criar types e interfaces
- [ ] Criar schemas Zod
- [ ] Criar service do Firestore
- [ ] Criar hooks (useQuery e useMutation)
- [ ] Criar componentes
- [ ] Criar tela principal
- [ ] Integrar na tab `reminders.tsx`

---

### 2.1. Estrutura de Pastas

```
modules/reminders/
├── components/
│   ├── MedicamentoCard.tsx
│   ├── LembreteItem.tsx
│   ├── AddMedicamentoButton.tsx
│   └── EmptyReminders.tsx
├── hooks/
│   ├── useMedicamentos.ts
│   ├── useAddMedicamento.ts
│   ├── useRegistroDose.ts
│   └── useLembretesDodia.ts
├── services/
│   ├── medicamentos.service.ts
│   └── registros.service.ts
├── utils/
│   ├── types.ts
│   ├── schemas.ts
│   └── lembreteHelpers.ts
├── view/
│   ├── RemindersScreen.tsx
│   └── AddMedicamentoScreen.tsx
└── index.ts
```

---

### 2.2. Types

**Arquivo:** `modules/reminders/utils/types.ts`

```typescript
import { Timestamp } from 'firebase/firestore';

export type Frequencia = 'diaria' | 'semanal' | 'personalizada';
export type StatusDose = 'tomado' | 'pulado' | 'pendente';
export type IntensidadeSintoma = 'baixa' | 'media' | 'alta';

export interface Medicamento {
  id: string;
  nome: string;
  dosagem: string;
  frequencia: Frequencia;
  horarios: string[]; // ["08:00", "20:00"]
  observacoes?: string;
  dataInicio: Timestamp;
  dataFim: Timestamp | null;
  criadoEm: Timestamp;
}

export interface RegistroDose {
  id: string;
  medicamentoRef: string; // path: /users/{uid}/medicamentos/{medId}
  nomeMedicamento: string; // denormalizado
  dosagem: string; // denormalizado
  horarioAgendado: Timestamp;
  horarioTomado: Timestamp | null;
  status: StatusDose;
}

export interface Lembrete {
  medicamentoId: string;
  nome: string;
  dosagem: string;
  horario: string; // "08:00"
  horarioAgendado: Date;
  status: StatusDose;
  registroId?: string; // Se já foi marcado
}
```

---

### 2.3. Schemas Zod

**Arquivo:** `modules/reminders/utils/schemas.ts`

```typescript
import { z } from 'zod';

export const addMedicamentoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  dosagem: z.string().min(1, 'Dosagem é obrigatória'),
  frequencia: z.enum(['diaria', 'semanal', 'personalizada'], {
    errorMap: () => ({ message: 'Selecione uma frequência' }),
  }),
  horarios: z
    .array(z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido'))
    .min(1, 'Adicione pelo menos um horário'),
  observacoes: z.string().optional(),
  dataInicio: z.date(),
  dataFim: z.date().nullable().optional(),
});

export type AddMedicamentoFormData = z.infer<typeof addMedicamentoSchema>;
```

---

### 2.4. Service de Medicamentos

**Arquivo:** `modules/reminders/services/medicamentos.service.ts`

```typescript
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/modules/auth/services/firebase.config';
import type { Medicamento } from '../utils/types';
import type { AddMedicamentoFormData } from '../utils/schemas';

export const medicamentosService = {
  /**
   * Busca todos os medicamentos do usuário
   */
  async getMedicamentos(userId: string): Promise<Medicamento[]> {
    try {
      const medicamentosRef = collection(db, 'users', userId, 'medicamentos');
      const q = query(medicamentosRef, orderBy('criadoEm', 'desc'));
      const snapshot = await getDocs(q);

      const medicamentos: Medicamento[] = [];
      snapshot.forEach((doc) => {
        medicamentos.push({
          id: doc.id,
          ...doc.data(),
        } as Medicamento);
      });

      return medicamentos;
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
      throw new Error('Não foi possível carregar os medicamentos');
    }
  },

  /**
   * Busca medicamentos ativos (que ainda não terminaram)
   */
  async getMedicamentosAtivos(userId: string): Promise<Medicamento[]> {
    try {
      const medicamentosRef = collection(db, 'users', userId, 'medicamentos');
      const hoje = Timestamp.now();

      const q = query(
        medicamentosRef,
        where('dataFim', '>=', hoje),
        orderBy('dataFim', 'asc')
      );

      const snapshot = await getDocs(q);

      const medicamentos: Medicamento[] = [];
      snapshot.forEach((doc) => {
        medicamentos.push({
          id: doc.id,
          ...doc.data(),
        } as Medicamento);
      });

      return medicamentos;
    } catch (error) {
      console.error('Erro ao buscar medicamentos ativos:', error);
      throw new Error('Não foi possível carregar os medicamentos ativos');
    }
  },

  /**
   * Adiciona um novo medicamento
   */
  async addMedicamento(
    userId: string,
    data: AddMedicamentoFormData
  ): Promise<string> {
    try {
      const medicamentosRef = collection(db, 'users', userId, 'medicamentos');

      const docRef = await addDoc(medicamentosRef, {
        nome: data.nome,
        dosagem: data.dosagem,
        frequencia: data.frequencia,
        horarios: data.horarios,
        observacoes: data.observacoes || '',
        dataInicio: Timestamp.fromDate(data.dataInicio),
        dataFim: data.dataFim ? Timestamp.fromDate(data.dataFim) : null,
        criadoEm: Timestamp.now(),
      });

      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar medicamento:', error);
      throw new Error('Não foi possível adicionar o medicamento');
    }
  },
};
```

---

### 2.5. Hook useMedicamentos

**Arquivo:** `modules/reminders/hooks/useMedicamentos.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { medicamentosService } from '../services/medicamentos.service';

export const useMedicamentos = (userId: string | null) => {
  return useQuery({
    queryKey: ['medicamentos', userId],
    queryFn: () => {
      if (!userId) throw new Error('User ID is required');
      return medicamentosService.getMedicamentos(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useMedicamentosAtivos = (userId: string | null) => {
  return useQuery({
    queryKey: ['medicamentos', 'ativos', userId],
    queryFn: () => {
      if (!userId) throw new Error('User ID is required');
      return medicamentosService.getMedicamentosAtivos(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
```

---

### 2.6. Hook useAddMedicamento

**Arquivo:** `modules/reminders/hooks/useAddMedicamento.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { medicamentosService } from '../services/medicamentos.service';
import type { AddMedicamentoFormData } from '../utils/schemas';

export const useAddMedicamento = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddMedicamentoFormData) =>
      medicamentosService.addMedicamento(userId, data),
    onSuccess: () => {
      // Invalida o cache para recarregar a lista
      queryClient.invalidateQueries({ queryKey: ['medicamentos', userId] });
      console.log('Medicamento adicionado com sucesso');
    },
    onError: (error: any) => {
      console.error('Erro ao adicionar medicamento:', error.message);
    },
  });
};
```

---

### 2.7. Service de Registros

**Arquivo:** `modules/reminders/services/registros.service.ts`

```typescript
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/modules/auth/services/firebase.config';
import type { RegistroDose, StatusDose } from '../utils/types';

export const registrosService = {
  /**
   * Busca registros de um período
   */
  async getRegistros(
    userId: string,
    inicio: Date,
    fim: Date
  ): Promise<RegistroDose[]> {
    try {
      const registrosRef = collection(db, 'users', userId, 'registrosDeDose');

      const q = query(
        registrosRef,
        where('horarioAgendado', '>=', Timestamp.fromDate(inicio)),
        where('horarioAgendado', '<=', Timestamp.fromDate(fim))
      );

      const snapshot = await getDocs(q);

      const registros: RegistroDose[] = [];
      snapshot.forEach((doc) => {
        registros.push({
          id: doc.id,
          ...doc.data(),
        } as RegistroDose);
      });

      return registros;
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
      throw new Error('Não foi possível carregar os registros');
    }
  },

  /**
   * Registra uma dose (tomado ou pulado)
   */
  async registrarDose(
    userId: string,
    medicamentoId: string,
    nomeMedicamento: string,
    dosagem: string,
    horarioAgendado: Date,
    status: StatusDose
  ): Promise<string> {
    try {
      const registrosRef = collection(db, 'users', userId, 'registrosDeDose');

      const docRef = await addDoc(registrosRef, {
        medicamentoRef: `/users/${userId}/medicamentos/${medicamentoId}`,
        nomeMedicamento,
        dosagem,
        horarioAgendado: Timestamp.fromDate(horarioAgendado),
        horarioTomado: status === 'tomado' ? Timestamp.now() : null,
        status,
      });

      return docRef.id;
    } catch (error) {
      console.error('Erro ao registrar dose:', error);
      throw new Error('Não foi possível registrar a dose');
    }
  },
};
```

---

### 2.8. Helper para Gerar Lembretes

**Arquivo:** `modules/reminders/utils/lembreteHelpers.ts`

```typescript
import type { Medicamento, Lembrete, RegistroDose } from './types';

/**
 * Gera lembretes do dia baseado nos medicamentos
 */
export function gerarLembretesDodia(
  medicamentos: Medicamento[],
  registros: RegistroDose[],
  data: Date = new Date()
): Lembrete[] {
  const lembretes: Lembrete[] = [];
  const hoje = new Date(data);
  hoje.setHours(0, 0, 0, 0);

  medicamentos.forEach((med) => {
    // Para cada horário do medicamento
    med.horarios.forEach((horario) => {
      const [hora, minuto] = horario.split(':').map(Number);
      const horarioAgendado = new Date(hoje);
      horarioAgendado.setHours(hora, minuto, 0, 0);

      // Verifica se já existe registro para este horário
      const registro = registros.find((r) => {
        const rDate = r.horarioAgendado.toDate();
        return (
          rDate.getTime() === horarioAgendado.getTime() &&
          r.medicamentoRef.includes(med.id)
        );
      });

      lembretes.push({
        medicamentoId: med.id,
        nome: med.nome,
        dosagem: med.dosagem,
        horario,
        horarioAgendado,
        status: registro ? registro.status : 'pendente',
        registroId: registro?.id,
      });
    });
  });

  // Ordenar por horário
  lembretes.sort((a, b) => a.horarioAgendado.getTime() - b.horarioAgendado.getTime());

  return lembretes;
}

/**
 * Agrupa lembretes por período do dia
 */
export function agruparLembretesPorPeriodo(lembretes: Lembrete[]) {
  const manha: Lembrete[] = [];
  const tarde: Lembrete[] = [];
  const noite: Lembrete[] = [];

  lembretes.forEach((lembrete) => {
    const hora = lembrete.horarioAgendado.getHours();

    if (hora >= 6 && hora < 12) {
      manha.push(lembrete);
    } else if (hora >= 12 && hora < 18) {
      tarde.push(lembrete);
    } else {
      noite.push(lembrete);
    }
  });

  return { manha, tarde, noite };
}

/**
 * Calcula taxa de adesão
 */
export function calcularTaxaAdesao(registros: RegistroDose[]): number {
  if (registros.length === 0) return 0;

  const tomados = registros.filter((r) => r.status === 'tomado').length;
  return (tomados / registros.length) * 100;
}
```

---

### 2.9. Componente LembreteItem

**Arquivo:** `modules/reminders/components/LembreteItem.tsx`

```typescript
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import type { Lembrete } from '../utils/types';

interface LembreteItemProps {
  lembrete: Lembrete;
  onMarcarComoTomado: () => void;
  onMarcarComoPulado: () => void;
}

export const LembreteItem: React.FC<LembreteItemProps> = ({
  lembrete,
  onMarcarComoTomado,
  onMarcarComoPulado,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getStatusColor = () => {
    switch (lembrete.status) {
      case 'tomado':
        return '#4CAF50';
      case 'pulado':
        return '#FF9800';
      default:
        return theme.tabIconDefault;
    }
  };

  const getStatusIcon = () => {
    switch (lembrete.status) {
      case 'tomado':
        return 'check-circle';
      case 'pulado':
        return 'cancel';
      default:
        return 'radio-button-unchecked';
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
          borderColor: getStatusColor(),
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.timeContainer}>
          <MaterialIcons name="access-time" size={20} color={theme.text} />
          <Text style={[styles.time, { color: theme.text }]}>
            {lembrete.horario}
          </Text>
        </View>
        <MaterialIcons
          name={getStatusIcon()}
          size={28}
          color={getStatusColor()}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.nome, { color: theme.text }]}>
          {lembrete.nome}
        </Text>
        <Text style={[styles.dosagem, { color: theme.text }]}>
          {lembrete.dosagem}
        </Text>
      </View>

      {lembrete.status === 'pendente' && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={onMarcarComoTomado}
          >
            <MaterialIcons name="check" size={20} color="#fff" />
            <Text style={styles.buttonText}>Tomado</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF9800' }]}
            onPress={onMarcarComoPulado}
          >
            <MaterialIcons name="close" size={20} color="#fff" />
            <Text style={styles.buttonText}>Pular</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    marginBottom: 12,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dosagem: {
    fontSize: 14,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
```

---

### 2.10. Tela RemindersScreen

**Arquivo:** `modules/reminders/view/RemindersScreen.tsx`

```typescript
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/modules/auth';
import { LembreteItem } from '../components/LembreteItem';
import { useMedicamentosAtivos } from '../hooks/useMedicamentos';
import { useRegistrosDoDia } from '../hooks/useRegistrosDoDia';
import { useRegistrarDose } from '../hooks/useRegistrarDose';
import { gerarLembretesDodia, agruparLembretesPorPeriodo } from '../utils/lembreteHelpers';

export const RemindersScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();

  const { data: medicamentos, isLoading: loadingMeds } = useMedicamentosAtivos(user?.uid || null);
  const { data: registros, isLoading: loadingRegs } = useRegistrosDoDia(user?.uid || null);
  const { mutate: registrarDose, isPending: salvando } = useRegistrarDose(user?.uid || '');

  // Gera lembretes baseado nos medicamentos e registros
  const lembretes = useMemo(() => {
    if (!medicamentos || !registros) return [];
    return gerarLembretesDodia(medicamentos, registros);
  }, [medicamentos, registros]);

  const lembretesPorPeriodo = useMemo(() => {
    return agruparLembretesPorPeriodo(lembretes);
  }, [lembretes]);

  if (loadingMeds || loadingRegs) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
        <Text style={[styles.loadingText, { color: theme.text }]}>
          Carregando lembretes...
        </Text>
      </View>
    );
  }

  const handleMarcarTomado = (lembrete: any) => {
    registrarDose({
      medicamentoId: lembrete.medicamentoId,
      nomeMedicamento: lembrete.nome,
      dosagem: lembrete.dosagem,
      horarioAgendado: lembrete.horarioAgendado,
      status: 'tomado',
    });
  };

  const handleMarcarPulado = (lembrete: any) => {
    registrarDose({
      medicamentoId: lembrete.medicamentoId,
      nomeMedicamento: lembrete.nome,
      dosagem: lembrete.dosagem,
      horarioAgendado: lembrete.horarioAgendado,
      status: 'pulado',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Lembretes de Hoje
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {lembretes.length} lembretes • {new Date().toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <FlatList
        data={lembretes}
        keyExtractor={(item, index) => `${item.medicamentoId}-${item.horario}-${index}`}
        renderItem={({ item }) => (
          <LembreteItem
            lembrete={item}
            onMarcarComoTomado={() => handleMarcarTomado(item)}
            onMarcarComoPulado={() => handleMarcarPulado(item)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              Nenhum lembrete para hoje
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.text }]}>
              Adicione medicamentos para ver lembretes
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    opacity: 0.7,
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.7,
  },
});
```

---

### 2.11. Integrar na Tab

**Arquivo:** `app/(tabs)/reminders.tsx` (MODIFICAR)

```typescript
import { RemindersScreen } from '@/modules/reminders/view/RemindersScreen';

export default RemindersScreen;
```

---

### 2.12. Exports do Módulo

**Arquivo:** `modules/reminders/index.ts`

```typescript
// Components
export * from './components/LembreteItem';
export * from './components/MedicamentoCard';

// Hooks
export * from './hooks/useMedicamentos';
export * from './hooks/useAddMedicamento';
export * from './hooks/useRegistroDose';

// Services
export * from './services/medicamentos.service';
export * from './services/registros.service';

// Utils
export * from './utils/lembreteHelpers';

// Types
export * from './utils/types';

// Views
export * from './view/RemindersScreen';
```

---

## FASE 3: Módulo Calendar (Sintomas)

### 📋 Checklist

- [ ] Criar estrutura de pastas `modules/calendar/`
- [ ] Criar types e schemas
- [ ] Criar service do Firestore
- [ ] Criar hooks
- [ ] Instalar biblioteca de calendário
- [ ] Criar componentes
- [ ] Criar tela principal
- [ ] Integrar na tab `calendar.tsx`

---

### 3.1. Estrutura de Pastas

```
modules/calendar/
├── components/
│   ├── CalendarView.tsx
│   ├── DayDetail.tsx
│   └── SintomaCard.tsx
├── hooks/
│   ├── useSintomas.ts
│   ├── useAddSintoma.ts
│   └── useSintomasDoMes.ts
├── services/
│   └── sintomas.service.ts
├── utils/
│   ├── types.ts
│   ├── schemas.ts
│   └── dateHelpers.ts
├── view/
│   └── CalendarScreen.tsx
└── index.ts
```

---

### 3.2. Types

**Arquivo:** `modules/calendar/utils/types.ts`

```typescript
import { Timestamp } from 'firebase/firestore';

export type IntensidadeSintoma = 'baixa' | 'media' | 'alta';

export interface Sintoma {
  id: string;
  data: Timestamp;
  descricao: string;
  intensidade: IntensidadeSintoma;
  observacoes?: string;
  criadoEm: Timestamp;
}

export interface DiaComSintoma {
  dia: string; // "2025-10-23"
  sintomas: Sintoma[];
  intensidadeMaxima: IntensidadeSintoma;
}
```

---

### 3.3. Schemas

**Arquivo:** `modules/calendar/utils/schemas.ts`

```typescript
import { z } from 'zod';

export const addSintomaSchema = z.object({
  data: z.date(),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  intensidade: z.enum(['baixa', 'media', 'alta'], {
    errorMap: () => ({ message: 'Selecione uma intensidade' }),
  }),
  observacoes: z.string().optional(),
});

export type AddSintomaFormData = z.infer<typeof addSintomaSchema>;
```

---

### 3.4. Service

**Arquivo:** `modules/calendar/services/sintomas.service.ts`

```typescript
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/modules/auth/services/firebase.config';
import type { Sintoma } from '../utils/types';
import type { AddSintomaFormData } from '../utils/schemas';

export const sintomasService = {
  /**
   * Busca sintomas de um período
   */
  async getSintomas(
    userId: string,
    inicio: Date,
    fim: Date
  ): Promise<Sintoma[]> {
    try {
      const sintomasRef = collection(db, 'users', userId, 'sintomas');

      const q = query(
        sintomasRef,
        where('data', '>=', Timestamp.fromDate(inicio)),
        where('data', '<=', Timestamp.fromDate(fim)),
        orderBy('data', 'desc')
      );

      const snapshot = await getDocs(q);

      const sintomas: Sintoma[] = [];
      snapshot.forEach((doc) => {
        sintomas.push({
          id: doc.id,
          ...doc.data(),
        } as Sintoma);
      });

      return sintomas;
    } catch (error) {
      console.error('Erro ao buscar sintomas:', error);
      throw new Error('Não foi possível carregar os sintomas');
    }
  },

  /**
   * Adiciona um novo sintoma
   */
  async addSintoma(
    userId: string,
    data: AddSintomaFormData
  ): Promise<string> {
    try {
      const sintomasRef = collection(db, 'users', userId, 'sintomas');

      const docRef = await addDoc(sintomasRef, {
        data: Timestamp.fromDate(data.data),
        descricao: data.descricao,
        intensidade: data.intensidade,
        observacoes: data.observacoes || '',
        criadoEm: Timestamp.now(),
      });

      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar sintoma:', error);
      throw new Error('Não foi possível adicionar o sintoma');
    }
  },
};
```

---

### 3.5. Date Helpers

**Arquivo:** `modules/calendar/utils/dateHelpers.ts`

```typescript
/**
 * Retorna início e fim do mês
 */
export function getMonthRange(data: Date): { inicio: Date; fim: Date } {
  const inicio = new Date(data.getFullYear(), data.getMonth(), 1, 0, 0, 0);
  const fim = new Date(data.getFullYear(), data.getMonth() + 1, 0, 23, 59, 59);
  return { inicio, fim };
}

/**
 * Retorna início e fim do dia
 */
export function getDayRange(data: Date): { inicio: Date; fim: Date } {
  const inicio = new Date(data);
  inicio.setHours(0, 0, 0, 0);

  const fim = new Date(data);
  fim.setHours(23, 59, 59, 999);

  return { inicio, fim };
}

/**
 * Formata data para string YYYY-MM-DD
 */
export function formatDateKey(data: Date): string {
  const year = data.getFullYear();
  const month = String(data.getMonth() + 1).padStart(2, '0');
  const day = String(data.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
```

---

## 📝 Ordem de Implementação Sugerida

### Sprint 1 (2-3 horas)
1. ✅ Fase 1: Auth + Firestore Profile
2. ✅ Testar criação de perfil ao fazer login

### Sprint 2 (4-6 horas)
1. ✅ Fase 2.1-2.5: Types, Schemas, Services e Hooks
2. ✅ Fase 2.6-2.9: Componentes e Helpers
3. ✅ Fase 2.10-2.11: Tela e Integração

### Sprint 3 (3-4 horas)
1. ✅ Fase 3: Módulo Calendar completo
2. ✅ Testar fluxo completo

---

## 🎨 Padrões de Código a Seguir

### 1. Sempre usar Types
```typescript
// ✅ BOM
interface Props {
  nome: string;
  onPress: () => void;
}

// ❌ RUIM
interface Props {
  nome: any;
  onPress: any;
}
```

### 2. React Query para data fetching
```typescript
// ✅ BOM - Com cache e refetch
const { data, isLoading } = useQuery({
  queryKey: ['medicamentos', userId],
  queryFn: () => service.getMedicamentos(userId),
  staleTime: 1000 * 60 * 5,
});

// ❌ RUIM - useEffect + useState
const [data, setData] = useState([]);
useEffect(() => {
  fetchData().then(setData);
}, []);
```

### 3. Validação com Zod
```typescript
// ✅ BOM
const schema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
});

try {
  schema.parse(formData);
} catch (error) {
  // tratar erros
}

// ❌ RUIM - Validação manual
if (!formData.nome) {
  setError('Nome obrigatório');
}
```

### 4. Componentes com Tema
```typescript
// ✅ BOM
const colorScheme = useColorScheme();
const theme = Colors[colorScheme ?? 'light'];

<Text style={[styles.text, { color: theme.text }]}>
  Texto
</Text>

// ❌ RUIM - Cores hardcoded
<Text style={{ color: '#000' }}>Texto</Text>
```

---

## ✅ Checklist Final

### Fase 1: Auth + Profile
- [ ] Criar `modules/auth/types/profile.types.ts`
- [ ] Criar `modules/auth/services/profile.service.ts`
- [ ] Criar `modules/auth/hooks/useProfile.ts`
- [ ] Modificar `modules/auth/hooks/useLogin.ts`
- [ ] Atualizar `modules/auth/index.ts`
- [ ] Testar login e criação de perfil

### Fase 2: Módulo Reminders
- [ ] Criar estrutura de pastas
- [ ] Criar `utils/types.ts`
- [ ] Criar `utils/schemas.ts`
- [ ] Criar `services/medicamentos.service.ts`
- [ ] Criar `services/registros.service.ts`
- [ ] Criar `hooks/useMedicamentos.ts`
- [ ] Criar `hooks/useAddMedicamento.ts`
- [ ] Criar `hooks/useRegistroDose.ts`
- [ ] Criar `utils/lembreteHelpers.ts`
- [ ] Criar `components/LembreteItem.tsx`
- [ ] Criar `view/RemindersScreen.tsx`
- [ ] Integrar em `app/(tabs)/reminders.tsx`
- [ ] Criar `index.ts` com exports
- [ ] Testar fluxo completo

### Fase 3: Módulo Calendar
- [ ] Criar estrutura de pastas
- [ ] Criar `utils/types.ts`
- [ ] Criar `utils/schemas.ts`
- [ ] Criar `utils/dateHelpers.ts`
- [ ] Criar `services/sintomas.service.ts`
- [ ] Criar `hooks/useSintomas.ts`
- [ ] Criar `hooks/useAddSintoma.ts`
- [ ] Instalar biblioteca de calendário
- [ ] Criar `components/CalendarView.tsx`
- [ ] Criar `components/SintomaCard.tsx`
- [ ] Criar `view/CalendarScreen.tsx`
- [ ] Integrar em `app/(tabs)/calendar.tsx`
- [ ] Criar `index.ts` com exports
- [ ] Testar fluxo completo

---

**Última atualização:** 2025-10-28
**Autor:** Equipe de Desenvolvimento
**Versão:** 1.0
