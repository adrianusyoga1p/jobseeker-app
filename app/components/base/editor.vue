<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

defineProps<{
  label?: string;
}>();

const editor = ref<Editor | undefined>();
const model = defineModel();

onMounted(() => {
  editor.value = new Editor({
    content: "",
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      model.value = editor.getHTML();
    },
  });
});

onBeforeUnmount(() => editor.value?.destroy());
</script>

<template>
  <div class="space-y-2 w-full">
    <label
      v-if="!!label"
      class="text-xs block text-netral-90 font-medium"
    >{{ label }}</label>

    <div
      v-if="editor"
      class="space-y-4 rounded-md w-full placeholder:text-netral-60 text-netral-90 px-4 py-2 outline-2 outline-netral-40"
    >
      <div class="flex gap-2 items-center flex-wrap">
        <base-button
          color="outline"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'bg-netral-40': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          Bold
        </base-button>

        <base-button
          color="outline"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'bg-netral-40': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          Italic
        </base-button>

        <base-button
          color="outline"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'bg-netral-40': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          Strike
        </base-button>

        <base-button
          color="outline"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'bg-netral-40': editor.isActive('code') }"
          @click="editor.chain().focus().toggleCode().run()"
        >
          Code
        </base-button>

        <base-button
          color="outline"
          @click="editor.chain().focus().unsetAllMarks().run()"
        >
          Clear marks
        </base-button>

        <base-button
          color="outline"
          @click="editor.chain().focus().clearNodes().run()"
        >
          Clear nodes
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('paragraph') }"
          @click="editor.chain().focus().setParagraph().run()"
        >
          Paragraph
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          H1
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          H2
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          H3
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('heading', { level: 4 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          H4
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('heading', { level: 5 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          H5
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('heading', { level: 6 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          H6
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          Bullet list
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          Ordered list
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('codeBlock') }"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          Code block
        </base-button>

        <base-button
          color="outline"
          :class="{ 'bg-netral-40': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          Blockquote
        </base-button>

        <base-button
          color="outline"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          Horizontal rule
        </base-button>

        <base-button
          color="outline"
          @click="editor.chain().focus().setHardBreak().run()"
        >
          Hard break
        </base-button>

        <base-button
          color="outline"
          :disabled="!editor.can().chain().focus().undo().run()"
          @click="editor.chain().focus().undo().run()"
        >
          Undo
        </base-button>

        <base-button
          color="outline"
          :disabled="!editor.can().chain().focus().redo().run()"
          @click="editor.chain().focus().redo().run()"
        >
          Redo
        </base-button>
      </div>

      <EditorContent :editor="editor" />
    </div>
  </div>
</template>
