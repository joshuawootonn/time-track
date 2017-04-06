#include "loginform.h"
#include "mainform.h"
#include "ui_loginform.h"

LoginForm::LoginForm(QWidget *parent) :
    QDialog(parent,Qt::CustomizeWindowHint),
    ui(new Ui::LoginForm)
{
    ui->setupUi(this);

    data = ((MainForm*)parentWidget())->getData();

    this->setGeometry(
        QStyle::alignedRect(
            Qt::LeftToRight,
            Qt::AlignCenter,
            this->size(),
            qApp->desktop()->availableGeometry()
        )
    );





}

LoginForm::~LoginForm()
{
    delete ui;
}

void LoginForm::reset(){
    data = ((MainForm*)parentWidget())->getData();
    ui->passEdit->clear();
    positionDialog();
}
void LoginForm::positionDialog(){
    //this->move((((MainForm*)parentWidget())->window()->frameGeometry().topLeft()) + (((MainForm*)parentWidget())->window()->rect().center()) - (this->rect().center()));


    //this->move((((MainForm*)parentWidget())->window()->frameGeometry().topLeft()) + (((MainForm*)parentWidget())->window()->frameGeometry().center()) - (this->rect().center()));

}

/*This function logs the user into the corresponding menu*/
void LoginForm::on_passEdit_returnPressed()
{
    pin= ui->passEdit->text();
    QSqlQuery qry1(data),qry2(data);
    qry1.prepare("SELECT * FROM employeelist where pin = '"+pin+"'");
    if (qry1.exec())
    {
        int count=0;
        while(qry1.next())
        {
           count++;
        }
        if(count == 1)
        {
            qry2.prepare("SELECT adminstatus,id FROM employeelist WHERE pin = '"+pin+"'");
            if(qry2.exec()){
                while(qry2.next()){
                    QString x= qry2.value(0).toString();
                    if(x=="1")
                        admin=true;
                    else
                        admin=false;
                    id = qry2.value(1).toString();
                }
            }

            this->hide();
            emit logged();
        }
        if(count < 1){
            if(ui->passEdit->text()!="")
                ui->passLabel->setText("Invalid");
        }
        else
            ui->passLabel->setText("");
    }
}
