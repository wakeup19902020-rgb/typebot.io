import { edgeSchema } from "./schemas/edge";

// Map legacy camelCase block types (from older Typebot API/imports) to current enum values
const blockTypeMap: Record<string, string> = {
  buttonsInput: "choice input",
  textInput: "text input",
  numberInput: "number input",
  emailInput: "email input",
  urlInput: "url input",
  dateInput: "date input",
  timeInput: "time input",
  phoneInput: "phone number input",
  pictureChoiceInput: "picture choice input",
  paymentInput: "payment input",
  ratingInput: "rating input",
  fileInput: "file input",
  rating: "rating input",
  setVariable: "Set variable",
  condition: "Condition",
  redirect: "Redirect",
  code: "Code",
  script: "Code",
  typebotLink: "Typebot link",
  wait: "Wait",
  abTest: "AB test",
  jump: "Jump",
  webhook: "webhook",
};

const migrateBlockType = (block: any) => {
  if (!block || !block.type) return block;
  const mapped = blockTypeMap[block.type];
  if (mapped) return { ...block, type: mapped };
  return block;
};

export const preprocessTypebot = (typebot: any) => {
  if (!typebot) return typebot;
  // Always migrate block types (camelCase → enum values) regardless of version
  const groups = typebot.groups
    ? typebot.groups.map(preprocessGroup)
    : [];
  if (Number(typebot.version) >= 5) return { ...typebot, groups };
  return {
    ...typebot,
    version:
      typebot.version === undefined || typebot.version === null
        ? "3"
        : typebot.version,
    groups,
    events: null,
    edges: typebot.edges
      ? typebot.edges?.filter((edge: any) => edgeSchema.safeParse(edge).success)
      : [],
  };
};

export const preprocessGroup = (group: any) => ({
  ...group,
  blocks: (group.blocks ?? []).map(migrateBlockType),
});

export const preprocessColumnsWidthResults = (arg: unknown) =>
  Array.isArray(arg) && arg.length === 0 ? {} : arg;
