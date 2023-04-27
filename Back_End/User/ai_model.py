import torch
from transformers import AutoTokenizer, BertForSequenceClassification
import numpy as np

tokenizer = AutoTokenizer.from_pretrained("UBC-NLP/MARBERT")
model = BertForSequenceClassification.from_pretrained("UBC-NLP/MARBERT")

# Load the saved state dictionary file
state_dict = torch.load('../models/model/pytorch_model.bin', map_location=torch.device('cpu'))

# Load the state dictionary into the model
model.load_state_dict(state_dict)
model.eval()

def predict(tweets):
    # Convert your test data to a list of strings
    texts = list(tweets)
    # Tokenize the test data
    test_input_ids = []
    test_attention_masks = []
    for text in texts:
        encoded_dict = tokenizer.encode_plus(text,
                                             add_special_tokens=True,
                                             max_length=64,
                                             pad_to_max_length=True,
                                             return_attention_mask=True,
                                             return_tensors='pt')
        test_input_ids.append(encoded_dict['input_ids'])
        test_attention_masks.append(encoded_dict['attention_mask'])

    # Convert the input ids and attention masks to tensors
    test_input_ids = torch.cat(test_input_ids, dim=0)
    test_attention_masks = torch.cat(test_attention_masks, dim=0)
    all_preds = []
    with torch.no_grad():
        for i in range(0, len(test_input_ids), 32):
            batch_input_ids = test_input_ids[i:i + 32]
            batch_attention_masks = test_attention_masks[i:i + 32]
            logits = model(batch_input_ids, attention_mask=batch_attention_masks)[0]
            preds = torch.softmax(logits, dim=1).detach().cpu().numpy()
            all_preds.append(preds)

    # Concatenate the predictions
    all_preds = np.concatenate(all_preds, axis=0)
    # Print the predicted probabilities for each class
    y_pred = np.argmax(all_preds, axis=1)
    return y_pred
