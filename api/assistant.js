const tools = [
  {
    type: "function",
    name: "add_class",
    description: "Add a class schedule with recurrence, selected days, date window, time, room, and teacher.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        recurrence: { type: "string", enum: ["Daily", "Weekly", "Monthly", "One time"] },
        dayMode: { type: "string", enum: ["Day range", "Selected days"] },
        startDay: { type: "string" },
        endDay: { type: "string" },
        selectedDays: { type: "array", items: { type: "string" } },
        startsOn: { type: "string", description: "YYYY-MM-DD date" },
        endsOn: { type: "string", description: "YYYY-MM-DD date, optional" },
        monthlyDay: { type: "string", description: "1-31 for monthly classes" },
        startTime: { type: "string", description: "HH:MM 24-hour time" },
        endTime: { type: "string", description: "HH:MM 24-hour time" },
        room: { type: "string" },
        teacher: { type: "string" }
      },
      required: ["name"]
    }
  },
  {
    type: "function",
    name: "add_assignment",
    description: "Add a school assignment.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string" },
        type: { type: "string", enum: ["Assignment", "Homework", "Presentation", "Project", "Paper", "Lab"] },
        className: { type: "string" },
        due: { type: "string", description: "YYYY-MM-DD or YYYY-MM-DDTHH:MM" },
        priority: { type: "string", enum: ["Low", "Medium", "High", "Urgent"] },
        status: { type: "string" },
        note: { type: "string" }
      },
      required: ["title"]
    }
  },
  {
    type: "function",
    name: "add_task",
    description: "Add a task.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string" },
        due: { type: "string" },
        priority: { type: "string", enum: ["Low", "Medium", "High", "Urgent"] },
        status: { type: "string" },
        note: { type: "string" },
        category: { type: "string", enum: ["General", "School"] }
      },
      required: ["title"]
    }
  },
  {
    type: "function",
    name: "add_reminder",
    description: "Add a reminder.",
    parameters: {
      type: "object",
      properties: {
        text: { type: "string" },
        when: { type: "string" },
        status: { type: "string" },
        note: { type: "string" }
      },
      required: ["text"]
    }
  },
  {
    type: "function",
    name: "add_bill",
    description: "Add a bill.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        amount: { type: "string" },
        due: { type: "string" },
        category: { type: "string" },
        note: { type: "string" }
      },
      required: ["name"]
    }
  },
  {
    type: "function",
    name: "mark_bill_paid",
    description: "Mark a matching bill paid.",
    parameters: {
      type: "object",
      properties: { name: { type: "string" } },
      required: ["name"]
    }
  },
  {
    type: "function",
    name: "add_workout",
    description: "Add a workout idea or workout log item.",
    parameters: {
      type: "object",
      properties: {
        text: { type: "string" },
        note: { type: "string" }
      },
      required: ["text"]
    }
  },
  {
    type: "function",
    name: "add_manual_workout",
    description: "Save a completed workout that the user forgot to time live.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        date: { type: "string", description: "YYYY-MM-DD" },
        startTime: { type: "string", description: "HH:MM 24-hour time" },
        endTime: { type: "string", description: "HH:MM 24-hour time" },
        durationMinutes: { type: "string", description: "Optional manual duration override in minutes" },
        notes: { type: "string" }
      },
      required: ["name", "date"]
    }
  },
  {
    type: "function",
    name: "add_journal_entry",
    description: "Save a complete journal entry in Journal History.",
    parameters: {
      type: "object",
      properties: {
        text: { type: "string" },
        title: { type: "string" },
        date: { type: "string", description: "YYYY-MM-DD" },
        time: { type: "string", description: "HH:MM 24-hour time" },
        mood: { type: "string" },
        tags: { type: "array", items: { type: "string" } }
      },
      required: ["text"]
    }
  },
  {
    type: "function",
    name: "create_study_block",
    description: "Create a self-learning study block.",
    parameters: {
      type: "object",
      properties: {
        subject: { type: "string" },
        topic: { type: "string" },
        start: { type: "string" },
        end: { type: "string" },
        goal: { type: "string" },
        method: { type: "string" }
      },
      required: ["subject"]
    }
  },
  {
    type: "function",
    name: "create_daily_schedule",
    description: "Fill daily schedule time slots.",
    parameters: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              time: { type: "string", description: "HH:MM" },
              title: { type: "string" },
              status: { type: "string" },
              note: { type: "string" }
            },
            required: ["time", "title"]
          }
        }
      },
      required: ["items"]
    }
  },
  {
    type: "function",
    name: "add_todo_item",
    description: "Add an item to a named to-do list.",
    parameters: {
      type: "object",
      properties: {
        listTitle: { type: "string" },
        text: { type: "string" }
      },
      required: ["text"]
    }
  },
  {
    type: "function",
    name: "add_important_date",
    description: "Add an exam, quiz, presentation, registration date, meeting, or deadline.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string" },
        className: { type: "string" },
        when: { type: "string" },
        type: { type: "string" },
        note: { type: "string" }
      },
      required: ["title"]
    }
  },
  {
    type: "function",
    name: "add_alarm",
    description: "Add a browser alarm.",
    parameters: {
      type: "object",
      properties: {
        time: { type: "string" },
        label: { type: "string" }
      },
      required: ["time"]
    }
  },
  {
    type: "function",
    name: "add_countdown",
    description: "Add a countdown timer.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string" },
        target: { type: "string" }
      },
      required: ["title", "target"]
    }
  },
  {
    type: "function",
    name: "add_money_transaction",
    description: "Add income or expense row to the money tracker.",
    parameters: {
      type: "object",
      properties: {
        date: { type: "string" },
        type: { type: "string" },
        category: { type: "string" },
        amount: { type: "string" },
        note: { type: "string" }
      },
      required: ["amount"]
    }
  },
  {
    type: "function",
    name: "add_savings_goal",
    description: "Create a goal in the Savings Vault.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        target: { type: "string" },
        current: { type: "string" },
        deadline: { type: "string", description: "YYYY-MM-DD" },
        priority: { type: "string" },
        color: { type: "string", description: "Optional hex color" }
      },
      required: ["name", "target"]
    }
  },
  {
    type: "function",
    name: "add_savings_deposit",
    description: "Record a deposit or withdrawal in the Savings Vault.",
    parameters: {
      type: "object",
      properties: {
        goalName: { type: "string" },
        date: { type: "string", description: "YYYY-MM-DD" },
        type: { type: "string", enum: ["Deposit", "Withdrawal"] },
        amount: { type: "string" },
        note: { type: "string" }
      },
      required: ["amount"]
    }
  },
  {
    type: "function",
    name: "add_learning_site",
    description: "Add a custom learning site to Study Hub.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string" },
        url: { type: "string" },
        note: { type: "string" }
      },
      required: ["title", "url"]
    }
  },
  {
    type: "function",
    name: "add_roadmap_step",
    description: "Add a roadmap step to the editable Roadmap page.",
    parameters: {
      type: "object",
      properties: {
        phase: { type: "string" },
        text: { type: "string" },
        status: { type: "string" }
      },
      required: ["text"]
    }
  },
  {
    type: "function",
    name: "update_profile",
    description: "Update profile fields.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        school: { type: "string" },
        grade: { type: "string" },
        city: { type: "string" },
        emergency: { type: "string" },
        goal: { type: "string" },
        bio: { type: "string" }
      }
    }
  },
  {
    type: "function",
    name: "mark_prayer_done",
    description: "Mark one of the five daily prayers done for the active date.",
    parameters: {
      type: "object",
      properties: {
        prayer: { type: "string", enum: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] },
        note: { type: "string" }
      },
      required: ["prayer"]
    }
  },
  {
    type: "function",
    name: "add_quran_reflection",
    description: "Save Quran reading progress and reflection for the active date.",
    parameters: {
      type: "object",
      properties: {
        surah: { type: "string" },
        ayah: { type: "string" },
        minutes: { type: "string" },
        reflection: { type: "string" }
      }
    }
  },
  {
    type: "function",
    name: "log_sleep",
    description: "Save a completed sleep session. Use full local ISO date-time values.",
    parameters: {
      type: "object",
      properties: {
        start: { type: "string", description: "ISO date-time" },
        end: { type: "string", description: "ISO date-time" },
        note: { type: "string" }
      },
      required: ["start", "end"]
    }
  }
];

function json(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(payload));
}

module.exports = async function handler(request, response) {
  if (request.method === "OPTIONS") return json(response, 200, { ok: true });
  if (request.method !== "POST") return json(response, 405, { error: "Use POST." });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return json(response, 500, { error: "OPENAI_API_KEY is not configured on the server." });

  let body = "";
  for await (const chunk of request) body += chunk;

  let payload;
  try {
    payload = JSON.parse(body || "{}");
  } catch {
    return json(response, 400, { error: "Invalid JSON body." });
  }

  const command = String(payload.command || "").trim();
  if (!command) return json(response, 400, { error: "Missing command." });

  const today = payload.snapshot?.activeDate || new Date().toISOString().slice(0, 10);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  let openaiResponse;
  try {
    openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    signal: controller.signal,
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
      store: false,
      parallel_tool_calls: true,
      tool_choice: "auto",
      instructions: [
        "You are the FahimOS personal operating system assistant.",
        "Help the user operate faith, school, study, health, money, planning, discipline, and career data.",
        "For create, update, schedule, track, save, complete, or mark-paid requests, return the necessary function calls.",
        "A single request may require several function calls. Keep them in the order they should be applied.",
        "For reviews, prioritization, explanations, coaching, or planning requests, answer with a concise practical plan and do not call tools unless the user explicitly asks to save changes.",
        "Use the active date as today when dates are vague and resolve relative dates before returning actions.",
        "Use YYYY-MM-DD dates, HH:MM 24-hour times, and ISO date-times where requested.",
        "Never invent completed activity. State when data is missing.",
        "Never request, reveal, infer, or modify passwords, API keys, credential-vault records, or other secrets.",
        "The browser will show every proposed action for user approval before applying it."
      ].join(" "),
      tools,
      input: [
        {
          role: "user",
          content: `Active date: ${today}\nPlanner snapshot: ${JSON.stringify(payload.snapshot || {})}\nCommand: ${command}`
        }
      ]
    })
    });
  } catch (error) {
    clearTimeout(timeout);
    const message = error.name === "AbortError" ? "The AI request timed out. Try a shorter command." : "Unable to reach OpenAI.";
    return json(response, 502, { error: message });
  }
  clearTimeout(timeout);

  const data = await openaiResponse.json();
  if (!openaiResponse.ok) {
    return json(response, openaiResponse.status, { error: data.error?.message || "OpenAI request failed." });
  }

  const actions = [];
  for (const item of data.output || []) {
    if (item.type === "function_call") {
      let args = {};
      try {
        args = JSON.parse(item.arguments || "{}");
      } catch {
        args = {};
      }
      actions.push({ name: item.name, arguments: args });
    }
  }

  return json(response, 200, {
    message: actions.length
      ? `Review ${actions.length} proposed action${actions.length === 1 ? "" : "s"} before saving.`
      : data.output_text || "No automation action was created.",
    actions,
    rawText: data.output_text || ""
  });
};
