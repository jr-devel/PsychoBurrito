import json

with open('app/static/utilities/descriptions.json','r',encoding='utf-8') as file:
    data = json.loads( file.read() )
    #------------------------------------------------------------#
    web = data["web"]
    web_description = web["web_description"]
    #------------------------------------------------------------#
    info = data["psychological_information"]
    anxiety             =  info["anxiety"]
    depression          =  info["depression"]
    low_self_esteem     =  info["low_self_esteem"]
    stress              =  info["stress"]
    emotion_management  =  info["emotion_management"]
    isolation           =  info["isolation"]
    aggresseiveness     =  info["aggresseiveness"]
    apathy              =  info["apathy"]
    suicide             =  info["suicide"]
    #------------------------------------------------------------#