import pyarabic.araby as araby
from tashaphyne.stemming import ArabicLightStemmer
import re
import arabicstopwords.arabicstopwords as stp
import numpy as np

def normalize_searchtext(tweet):
    # for text in listOfWords:
    text = araby.strip_tashkeel(tweet)
    text = araby.strip_harakat(text)
    text = araby.strip_lastharaka(text)
    text = araby.strip_tatweel(text)
    text = araby.normalize_hamza(text)
    text = araby.normalize_ligature(text)
    return text

# def removeStopWords(tweet):
#     newList = []
#     for word in listOfWords:
#         tweet=
#         if not stp.is_stop(word):
#             newList.append(word)
#     return newList
def removeEmojis(tweet):
        emoji_pattern = re.compile("["
            u"\U0001F600-\U0001F64F" 
            u"\U0001F300-\U0001F5FF"  
            u"\U0001F680-\U0001F6FF"  
            u"\U0001F1E0-\U0001F1FF"  
                               "]+", flags=re.UNICODE)
        text = emoji_pattern.sub(r'', tweet)
        if text:
            return text
        else:
            return " "

def stemming(tweet):
        ArListem = ArabicLightStemmer()
        stem = ArListem.light_stem(tweet)
        return ArListem.get_stem()

def removeEnglishWords(tweet):
        sentence=re.sub('@[^\s]+',' ',tweet)
        sentence = re.sub(r"http\S+", ' ', sentence)
        sentence = re.sub(r'\s*[A-Za-z]+\b', ' ', sentence)
        sentence = sentence.rstrip()
        sentence = ''.join((z for z in sentence if not z.isdigit()))
        sentence = ''.join(c for c in sentence if not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z')))
        if not sentence:
            return " "
        return sentence

def removePuncation(tweet):
    result= re.sub(r'[^\w\s]',' ',tweet)
    if not result:
        return " "
    return result


def preprocess(Sentence):
    sentence = removeEnglishWords(Sentence)
    sentence = normalize_searchtext(sentence)
    # sentences = removeStopWords(sentences)
    sentence = removeEmojis(sentence)
    sentence = stemming(sentence)
    sentence = removePuncation(sentence)
    return sentence
