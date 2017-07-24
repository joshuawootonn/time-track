#include "itemeditform.h"
#include "ui_itemeditform.h"
#include "mainform.h"

ItemEditForm::ItemEditForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ItemEditForm)
{
    ui->setupUi(this);
    data = ((MainForm*)parentWidget())->getData();
}
void ItemEditForm::AddItem(){
    this->showNormal();
    task="add";
    ui->name->setText("");
}
QString ItemEditForm::AddValid(){
   return "";
}

void ItemEditForm::EditItem(QString x){
    id = x;
}
QString ItemEditForm::EditValid(){
    return "";
}

ItemEditForm::~ItemEditForm()
{
    delete ui;
}


QString ItemEditForm::getSuccessMsg() const
{
    return successMsg;
}
bool ItemEditForm::getSuccess() const
{
    return success;
}

void ItemEditForm::on_FinishButton_clicked()
{
    if(AddValid() == "" && task=="add")
    {
        QSqlQuery * qry = new QSqlQuery(data);
        qry->prepare("insert into itemlist(name) "
                     " values('"+ui->name->text()+"')");


        if (qry->exec())
            success = true;
        else{
            success = false;
            successMsg = "Error Creating Item";
        }

        this->hide();
        emit finished();
    }
    if(EditValid() == "" && task=="edit")
    {
        QSqlQuery * qry = new QSqlQuery(data);
        qry->prepare("update itemlist set name='"+ui->name->text()+"'  where id = '"+id+"'");

        if (qry->exec())
            success = true;
        else{
            success = false;
            successMsg = "Error Editing Item";
        }

        qry->clear();
        qry->prepare("update shiftlist set itemname='"+ui->name->text()+"'  where itemid = '"+id+"'");
        if (qry->exec())
            success = true;
        else{
            success = false;
            successMsg = "Error Editing Item";
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
void ItemEditForm::on_CancelButton_clicked()
{

}
