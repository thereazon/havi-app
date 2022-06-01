<script setup>
import { Button, Form, Field, CellGroup } from "vant";
import { ref, defineComponent } from "vue";

const username = ref("");
const password = ref("");
const onSubmit = (values) => {
  console.log("submit", values);
};
</script>

<template>
  <div>
    <Form @submit="onSubmit">
      <CellGroup inset>
        <Field
          v-model="username"
          name="Username"
          label="Username"
          placeholder="Username"
          :rules="[{ required: true, message: 'Username is required' }]"
        />
        <Field
          v-model="password"
          type="password"
          name="Password"
          label="Password"
          placeholder="Password"
          :rules="[{ required: true, message: 'Password is required' }]"
        />
      </CellGroup>
      <div style="margin: 16px">
        <Button round block type="primary" native-type="submit">
          Submit
        </Button>
      </div>
    </Form>
  </div>
</template>
