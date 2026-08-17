const respo = new RESPO_GROUP_OFFER();
respo.addCopilot("Copilot_1", "https://copilot.microsoft.com/chats/s5JJTZPB6ZaBiYENMoAzj");
respo.addCopilot("Copilot_2", "https://copilot.microsoft.com/chats/Qcnvk5kRfNKi1CLrs1uYc");
respo.addCopilot("Copilot_3", "https://copilot.microsoft.com/chats/hN6XfkYLjCaoV1r1yijCA");

const gruppe = respo.offerGroup();
console.log(gruppe);
