// $(document).ready(function () {
//   function formatReply(text) {
//     // Convert headings
//     text = text.replace(/^### (.+)$/gm, '<div class="subHeader_bO3k">$1</div>');
//     text = text.replace(/^## (.+)$/gm, '<div class="sectionHeader_omS2">$1</div>');
//     text = text.replace(/^#### (.+)$/gm, '<div class="longContent_ftQD"><strong>$1</strong></div>');

//     // Convert bullet points
//     text = text.replace(/^- (.+)$/gm, '<div class="bulletPoint_CbWx">• $1</div>');

//     // Convert tables
//     if (text.includes('|')) {
//       const lines = text.trim().split('\n');
//       const tableLines = lines.filter(line => line.includes('|'));
//       if (tableLines.length >= 2) {
//         const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
//         const rows = tableLines.slice(2).map(line =>
//           line.split('|').map(cell => cell.trim()).filter(Boolean)
//         );

//         let html = '<div class="longContent_ftQD"><table class="custom-table"><thead><tr>';
//         headers.forEach(h => html += `<th>${h}</th>`);
//         html += '</tr></thead><tbody>';
//         rows.forEach(row => {
//           html += '<tr>';
//           row.forEach(cell => html += `<td>${cell}</td>`);
//           html += '</tr>';
//         });
//         html += '</tbody></table></div>';

//         return html;
//       }
//     }

//     // Wrap the whole response
//     return `<div class="longContent_ftQD">${text}</div>`;
//   }

//   $('#send-btn').on('click', function () {
//     var userInput = $('#user-input').val();
//     if (userInput.trim() !== "") {
//       $('#chatbot-messages').append('<div class="user-message">' + userInput + '</div>');
//       $('#user-input').val('');

//       // Show typing indicator
//       const typingIndicator = $('<div class="bot-message typing-indicator">Typing...</div>');
//       $('#chatbot-messages').append(typingIndicator);
//       $('#chatbot-messages').scrollTop($('#chatbot-messages')[0].scrollHeight);

//       // Call Circle Layer API
//       $.ajax({
//         url: "https://docs.circlelayer.com/api/chat",
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": "circle_layer_api_2024_demo_key"
//         },
//         data: JSON.stringify({
//           query: userInput,
//           options: {
//             responseType: "brief",
//             technicalLevel: "basic"
//           }
//         }),
//         success: function (res) {
//           typingIndicator.remove();
//           const reply = res?.data?.message || "Sorry, I couldn’t find an answer.";
//           const formattedReply = formatReply(reply);
//           $('#chatbot-messages').append('<div class="bot-message">' + formattedReply + '</div>');
//           $('#chatbot-messages').scrollTop($('#chatbot-messages')[0].scrollHeight);
//         },
//         error: function (xhr) {
//           typingIndicator.remove();
//           let message = "Oops! Something went wrong.";
//           if (xhr.status === 401) message = "Missing API key.";
//           else if (xhr.status === 403) message = "Invalid API key.";
//           else if (xhr.status === 429) message = "Rate limit exceeded. Please try later.";
//           else if (xhr.status === 400) message = "Invalid question format.";

//           $('#chatbot-messages').append('<div class="bot-message">' + message + '</div>');
//         }
//       });
//     }
//   });

//   $('#user-input').on('keypress', function (e) {
//     if (e.which === 13) {
//       $('#send-btn').click();
//     }
//   });

//   $('#chatbot-toggle-btn').on('click', function () {
//     $('#chatbot-container').toggle();
//   });

//   $('#chatbot-close-btn').on('click', function () {
//     $('#chatbot-container').hide();
//   });
// });
$(document).ready(function () {
//   function formatReply(text) {
//     // Convert headings
//     // Convert headings and add divider
// text = text.replace(/^## (.+)$/gm, '<div class="sectionHeader_omS2">$1</div><hr class="divider_hr">');
// text = text.replace(/^### (.+)$/gm, '<div class="subHeader_bO3k">$1</div><hr class="divider_hr">');
// text = text.replace(/^#### (.+)$/gm, '<div class="longContent_ftQD"><strong>$1</strong></div>');

// // Convert bold bullet points and remove **
// text = text.replace(/^[-•] \*\*(.+?)\*\*: (.+)$/gm, '<div class="bulletPoint_CbWx"><strong>$1:</strong> $2</div>');
// text = text.replace(/^[-•] \*\*(.+?)\*\*$/gm, '<div class="bulletPoint_CbWx"><strong>$1</strong></div>');
// text = text.replace(/^[-•] (.+)$/gm, '<div class="bulletPoint_CbWx"><strong>$1</strong></div>');

// // Remove any remaining standalone **bold** formatting
// text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

//     // Convert bullet points with **bold**
//     text = text.replace(/^• \*\*(.+?)\*\*: (.+)$/gm, '<div class="bulletPoint_CbWx"><strong>$1:</strong> $2</div>');
//     text = text.replace(/^• \*\*(.+?)\*\*$/gm, '<div class="bulletPoint_CbWx"><strong>$1</strong></div>');
//     text = text.replace(/^• (.+)$/gm, '<div class="bulletPoint_CbWx"><strong>$1</strong></div>');
//     text = text.replace(/^- \*\*(.+?)\*\*: (.+)$/gm, '<div class="bulletPoint_CbWx"><strong>$1:</strong> $2</div>');
//     text = text.replace(/^- \*\*(.+?)\*\*$/gm, '<div class="bulletPoint_CbWx"><strong>$1</strong></div>');
//     text = text.replace(/^- (.+)$/gm, '<div class="bulletPoint_CbWx"><strong>$1</strong></div>');

//     // Convert tables
//     if (text.includes('|')) {
//       const lines = text.trim().split('\n');
//       const tableLines = lines.filter(line => line.includes('|'));
//       if (tableLines.length >= 2) {
//         const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
//         const rows = tableLines.slice(2).map(line =>
//           line.split('|').map(cell => cell.trim()).filter(Boolean)
//         );

//         let html = '<div class="longContent_ftQD"><table class="custom-table"><thead><tr>';
//         headers.forEach(h => html += `<th>${h}</th>`);
//         html += '</tr></thead><tbody>';
//         rows.forEach(row => {
//           html += '<tr>';
//           row.forEach(cell => html += `<td>${cell}</td>`);
//           html += '</tr>';
//         });
//         html += '</tbody></table></div>';

//         return html;
//       }
//     }

//     // Wrap the whole response
//     return `<div class="longContent_ftQD">${text}</div>`;
//   }
function formatReply(text) {
  // Convert headings
  text = text.replace(/^## (.+)$/gm, '<div class="sectionHeader_omS2">$1</div><hr class="divider_hr">');
  text = text.replace(/^### (.+)$/gm, '<div class="subHeader_bO3k">$1</div><hr class="divider_hr">');
  text = text.replace(/^#### (.+)$/gm, '<div class="longContent_ftQD"><strong>$1</strong></div>');

  // Convert bullet points and bold
  text = text.replace(/^[-•] \*\*(.+?)\*\*: (.+)$/gm, '<div class="bulletPoint_CbWx"><strong>$1:</strong> $2</div>');
  text = text.replace(/^[-•] \*\*(.+?)\*\*$/gm, '<div class="bulletPoint_CbWx"><strong>$1</strong></div>');
  text = text.replace(/^[-•] (.+)$/gm, '<div class="bulletPoint_CbWx"><strong>$1</strong></div>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert tables
  if (text.includes('|')) {
    const lines = text.trim().split('\n');
    const tableLines = lines.filter(line => line.includes('|'));
    if (tableLines.length >= 2) {
      const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
      const rows = tableLines.slice(2).map(line =>
        line.split('|').map(cell => cell.trim()).filter(Boolean)
      );

      let html = '<div class="longContent_ftQD"><table class="custom-table"><thead><tr>';
      headers.forEach(h => html += `<th>${h}</th>`);
      html += '</tr></thead><tbody>';
      rows.forEach(row => {
        html += '<tr>';
        row.forEach(cell => html += `<td>${cell}</td>`);
        html += '</tr>';
      });
      html += '</tbody></table></div>';

      return html;
    }
  }

  // ✅ Add Code Block Support (``` or indented)
  // Handle triple backtick blocks
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, function (match, lang, code) {
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="codeBox_dark"><pre><code class="language-${lang || 'plaintext'}">${escaped}</code></pre></div>`;
  });

  // Handle inline `code` (single backticks)
  text = text.replace(/`([^`]+)`/g, '<code class="inlineCode">$1</code>');

  return `<div class="longContent_ftQD">${text}</div>`;
}

  $('#send-btn').on('click', function () {
    var userInput = $('#user-input').val();
    if (userInput.trim() !== "") {
      $('#chatbot-messages').append('<div class="user-message">' + userInput + '</div>');
      $('#user-input').val('');

      const typingIndicator = $('<div class="bot-message typing-indicator">Typing...</div>');
      $('#chatbot-messages').append(typingIndicator);
      $('#chatbot-messages').scrollTop($('#chatbot-messages')[0].scrollHeight);

      $.ajax({
        url: "https://docs.circlelayer.com/api/chat",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "circle_layer_api_2024_demo_key"
        },
        data: JSON.stringify({
          query: userInput,
          options: {
            responseType: "brief",
            technicalLevel: "basic"
          }
        }),
        success: function (res) {
          typingIndicator.remove();
          const reply = res?.data?.message || "Sorry, I couldn’t find an answer.";
          const formattedReply = formatReply(reply);
          $('#chatbot-messages').append('<div class="bot-message">' + formattedReply + '</div>');
          $('#chatbot-messages').scrollTop($('#chatbot-messages')[0].scrollHeight);
        },
        error: function (xhr) {
          typingIndicator.remove();
          let message = "Oops! Something went wrong.";
          if (xhr.status === 401) message = "Missing API key.";
          else if (xhr.status === 403) message = "Invalid API key.";
          else if (xhr.status === 429) message = "Rate limit exceeded. Please try later.";
          else if (xhr.status === 400) message = "Invalid question format.";

          $('#chatbot-messages').append('<div class="bot-message">' + message + '</div>');
        }
      });
    }
  });

  $('#user-input').on('keypress', function (e) {
    if (e.which === 13) {
      $('#send-btn').click();
    }
  });

  $('#chatbot-toggle-btn').on('click', function () {
    $('#chatbot-container').toggle();
  });

  $('#chatbot-close-btn').on('click', function () {
    $('#chatbot-container').hide();
  });
});
