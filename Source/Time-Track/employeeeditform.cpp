#include "employeeeditform.h"
#include "ui_employeeeditform.h"
#include "mainform.h"

EmployeeEditForm::EmployeeEditForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::EmployeeEditForm)
{
    ui->setupUi(this);
    data = ((MainForm*)parentWidget())->getData();
    ui->admin->setChecked(false);


}
// Initializer for when a employee is being created
void EmployeeEditForm::AddEmployee(){
    this->showNormal();
    task="add";
    ui->name->setText("");
    ui->pin->setText("");
    ui->admin->setChecked(false);
    ui->active->setChecked(true);

}

// Initializer for when a employee is being edited
void EmployeeEditForm::EditEmployee(QString x){
    this->showNormal();
    task = "edit";
    id=x;
    QSqlQuery * qry = new QSqlQuery(data);
    QString name,pin,admin,current;
    qry->prepare("SELECT name,pin,adminstatus,current FROM employeelist WHERE id ='"+id+"'");
    if(qry->exec()){
        while(qry->next()){
            name = qry->value(0).toString();
            pin = qry->value(1).toString();
            admin = qry->value(2).toString();
            current = qry->value(3).toString();
        }
    }
    ui->name->setText(name);
    ui->pin->setText(pin);
    if(admin =="1")
        ui->admin->setChecked(true);
    else
        ui->admin->setChecked(false);
    if(current =="1")
        ui->active->setChecked(true);
    else
        ui->active->setChecked(false);

}

EmployeeEditForm::~EmployeeEditForm()
{
    delete ui;
}
// Generates random unique pin
int EmployeeEditForm::generateRandom(){
    int x = rand()%9000+1000;
    QSqlQuery * qry = new QSqlQuery(data);
    qry->prepare("select pin from employeelist");
    if(qry->exec())
    {
        while(qry->next())
        {
            if(qry->value(0).toInt()==x)
                return generateRandom();
        }
    }
    return x;
}
void EmployeeEditForm::on_GenerateButton_clicked()
{
    ui->pin->setText(QString::number(generateRandom()));
}

// Getters for the values of the validation methods
QString EmployeeEditForm::getSuccessMsg() const
{
    return successMsg;
}
bool EmployeeEditForm::getSuccess() const
{
    return success;
}
// Validation for when a employeee is created
QString EmployeeEditForm::AddValid(){
    QString error;
    if(ui->name->text().length()<5)
        error = "Invalid name: Minimun length 5";
    if(ui->pin->text().length() < 4)
        error = "Invalid pin: Required length 4";
    QRegExp name_regrex("^[a-zA-Z ]+$");  // a digit (\d), zero or more times (*)
    QRegExp pin_regrex("^[0-9]+$");
    if (!name_regrex.exactMatch(ui->name->text()))
       error = "Invalid name: Must be Letters only";
    if (!pin_regrex.exactMatch(ui->pin->text()))
       error = "Invalid pin: Must be Numbers only";

    return error;
}
// Validation for when a employee is edited
QString EmployeeEditForm::EditValid(){
    QString error = "";
    QRegExp name_regrex("^[a-zA-Z ]+$");
    QRegExp pin_regrex("^[0-9]+$");

    if(ui->name->text().length()<5)
        error = "Invalid name: Minimun length 5";
    else if(ui->pin->text().length() < 4)
        error = "Invalid pin: Required length 4";
    else if (!name_regrex.exactMatch(ui->name->text()))
       error = "Invalid name: Must be Letters only";
    else if (!pin_regrex.exactMatch(ui->pin->text()))
       error = "Invalid pin: Must be Numbers only";
    else{
        QSqlQuery * qry = new QSqlQuery(data);
        QString pin = ui->pin->text();
        QString currentPin;
        qry->prepare("SELECT pin FROM employeelist WHERE pin = "+pin+"");
        int pinCount =0;
        if(qry->exec()){
            while(qry->next()){
                pinCount++;
            }
        }
        qry->clear();
        qry->prepare("SELECT pin FROM employeelist WHERE id = "+id+"");
        if(qry->exec()){
            while(qry->next()){
                currentPin = qry->value(0).toString();
            }
        }
        if(pin == currentPin && pinCount > 1){
            error = "Invalid pin: Must be unique";
        }else if(pinCount>0){
            error = "Invalid pin: Must be unique";
        }

        qDebug()<<qry->lastError().text();
    }
    return error;
}
// Self evident
void EmployeeEditForm::on_FinishButton_clicked()
{
    if(AddValid() == "" && task=="add")
    {
        QSqlQuery * qry = new QSqlQuery(data);
        QString admin = QString::number(int(ui->admin->isChecked()));
        QString active = QString::number(int(ui->active->isChecked()));
        qry->prepare("insert into employeelist(name,pin,adminstatus,shiftcount,active,current) "
                     " values('"+ui->name->text()+"','"+ui->pin->text()+"','"+admin+"','1','0','"+active+"')");
        if (qry->exec())
            success = true;
        else{
            success = false;
            successMsg = "Error Creating Employee";
        }

        this->hide();
        emit finished();
    }
    if(EditValid() == "" && task=="edit")
    {
        QSqlQuery * qry = new QSqlQuery(data);
        QString admin = QString::number(int(ui->admin->isChecked()));
        QString active = QString::number(int(ui->active->isChecked()));
        qry->prepare("update employeelist set name='"+ui->name->text()+"', pin='"+ui->pin->text()+"', adminstatus='"+admin+"', current='"+active+"'  where id = '"+id+"'");

        if (qry->exec())
            success = true;
        else{
            success = false;
            successMsg = "Error Editing Employee";
        }

        qry->clear();
        qry->prepare("update shiftlist set employeename='"+ui->name->text()+"'  where employeeid = '"+id+"'");
        if (qry->exec())
            success = true;
        else{
            success = false;
            successMsg = "Error Editing Employee";
        }
        this->hide();
        emit finished();
    }
    else if(task=="edit"){
        ui->error->setText(EditValid());
    }
    else{
        ui->error->setText(AddValid());
    }

}
void EmployeeEditForm::on_CancelButton_clicked()
{
    this->hide();
    emit finished();

}


