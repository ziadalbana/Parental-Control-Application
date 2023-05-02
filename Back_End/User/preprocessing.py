import pyarabic.araby as araby
from tashaphyne.stemming import ArabicLightStemmer
import re
import arabicstopwords.arabicstopwords as stp
import numpy as np

def normalize_searchtext(listOfWords):
    newList = []
    for text in listOfWords:
        text = araby.strip_tashkeel(text)
        text = araby.strip_harakat(text)
        text = araby.strip_lastharaka(text)
        text = araby.strip_tatweel(text)
        text = araby.normalize_hamza(text)
        text = araby.normalize_ligature(text)
        newList.append(text)
    return newList

def removeStopWords(listOfWords):
    newList = []
    for word in listOfWords:
        if not stp.is_stop(word):
            newList.append(word)
    return newList
def removeEmojis(listOfWords):
    newList = []
    for text in listOfWords:
        emoji_pattern = re.compile("["
            u"\U0001F600-\U0001F64F" 
            u"\U0001F300-\U0001F5FF"  
            u"\U0001F680-\U0001F6FF"  
            u"\U0001F1E0-\U0001F1FF"  
                               "]+", flags=re.UNICODE)
        text = emoji_pattern.sub(r'', text)
        if text:
            newList.append(text)
        else:
            newList.append(" ")
    return newList

def stemming(listOfWords):
    newList = []
    for text in listOfWords:
        ArListem = ArabicLightStemmer()
        stem = ArListem.light_stem(text)
        newList.append(stem.get_stem(stem))
    return newList
def removeEnglishWords(ListOfSentence):
    newList = []
    for row in ListOfSentence:
        sentence=re.sub('@[^\s]+',' ',row)
        sentence = re.sub(r"http\S+", ' ', sentence)
        sentence = re.sub(r'\s*[A-Za-z]+\b', ' ' , sentence)
        sentence = sentence.rstrip()
        sentence = ''.join((z for z in sentence if not z.isdigit()))
        sentence = ''.join(c for c in sentence if not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z')))
        if not sentence:
            newList.append(" ")
        else:
            newList.append(sentence)
    return newList

def removePuncation(ListOfSentence):
    newlist=[]
    for row in ListOfSentence:
        result= re.sub(r'[^\w\s]',' ',row)
        if not result:
            newlist.append(" ")
        else:
            newlist.append(result)
    return newlist


def preprocess(ListOfSentences):
    sentences = ListOfSentences
    sentences = removeEnglishWords(sentences)
    sentences = normalize_searchtext(sentences)
    sentences = removeStopWords(sentences)
    sentences = removeEmojis(sentences)
    sentences = stemming(sentences)
    sentences = removePuncation(sentences)
    return np.array(sentences)
