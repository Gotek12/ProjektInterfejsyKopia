class Konspekt{
    constructor (date, place, topic){
        if(typeof place !== String || typeof topic !== String) throw "Illegal konspekt values!"
        this.nameOfKonspekt = "konspekt"+date
        this.date = date
        this.place = place
        this.topic = topic
        this.elements = []
    }

    addElement(element){
        this.elements.push(element)
    }
}

class Element{
    constructor (name, form, time, time_description){
        if(typeof name !== String) throw "Illegal element name!"
        else this.name = name
        if(typeof form !== String) throw "Illegal element form!"
        else this.form = form
        if(typeof time !== int || time <= 0) throw "Illegal element time!"
        else this.time = time
        if(typeof time_description !== String) throw "Illegal element time description!"
        else this.time_description = time_description
    }

    changeName(newName){
        if(typeof newName !== String) throw "Illegal element change name!"
        else this.name = newName
    }

    changeForm(newForm){
        if(typeof newForm !== String) throw "Illegal element change form!"
        else this.form = newForm
    }

    changeTime(newTime){
        if(typeof newTime !== int || time <= 0) throw "Illegal element change time!"
        else this.time = newTime
    }

    changeTimeDescription(newTimeDescription){
        if(typeof newTimeDescription !== String) throw "Illegal element change time description!"
        else this.time_description = newTimeDescription
    }

    setGoal(goal){
        if(typeof goal !== String) throw "Illegal addGoal value!"
        else this.goal = goal
    }

    setRequirements(requirements){
        if(typeof requirements !== String) throw "Illegal addRequirements value!"
        else this.requirements = requirements
    }

    get toList(){
        l = [this.name, this.form, this.time, this.time_description]
        if(typeof this.goal!== undefined) l.push(this.goal)
        else l.push(null)
        if(typeof this.requirements!== undefined) l.push(this.requirements)
        else l.push(null)
    }
}