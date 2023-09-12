<template>
  <div ml-4>
    <div class="d-flex">
      <div class="d-flex text-h4 ml-8 mt-4">Xml Data</div>
      <div class="ml-8 mt-4"><v-btn @click="updateXml">Update XML</v-btn></div>
      <div class="ml-8 mt-4"><v-btn @click="resetXml">Reset XML</v-btn></div>
    </div>
    <!-- <button @click="downloadXml" v-if="updatedXml">Download Updated XML</button> -->
    <v-card
      width="1200"
      height="2000"
      class="overflow-auto ml-8 mt-10 border border-primary"
    >
      <v-card-text>
        <pre>
           <div v-html="highlightedCode"></div>
       </pre>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import Prism from "prismjs";
import { ref, onMounted, computed } from "vue";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-xml-doc";

const data = ref<string>("");
const updatedXml = ref<string | null>(null);

onMounted(async () => {
  fetchXml()
  // console.log(data);
});

async function fetchXml() {
  const res = await window.fetch("http://127.0.0.1:5500/boilerplate.xml");
  data.value = await res.text();
  return data.value
}

async function resetXml () {
  data.value = await fetchXml()

}

const updateXml = () => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data.value, "text/xml");

  // Your XML update instructions go here
  // For example, updating the text of an element:
  const someElement = xmlDoc.querySelector("person");
  if (someElement) {
    someElement.textContent = "New Value";
  }

  const serializer = new XMLSerializer();
  updatedXml.value = serializer.serializeToString(xmlDoc);
  data.value = updatedXml.value
};

const highlightedCode = computed(() => {
  const formattedXML = formatXml(data.value);
  return Prism.highlight(formattedXML, Prism.languages.xml, "xml");
});

function formatXml(xml: string) {
  var reg = /(>)\s*(<)(\/*)/g; // Removes line breaks between XML nodes
  xml = xml.replace(reg, "$1\n$2$3");
  var nodes = xml.split("\n");
  var prefix = "";
  var formattedXml = "";
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (prefix !== "") {
        prefix = prefix.substring(0, prefix.length - 2);
      }
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 2;
    }
    formattedXml += prefix + node + "\n";
    prefix += new Array(indent).join("  ");
  }
  return formattedXml;
}
</script>
