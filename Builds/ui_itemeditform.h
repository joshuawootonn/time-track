/********************************************************************************
** Form generated from reading UI file 'itemeditform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_ITEMEDITFORM_H
#define UI_ITEMEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ItemEditForm
{
public:
    QGridLayout *gridLayout;
    QWidget *bigwidger;
    QVBoxLayout *verticalLayout;
    QWidget *widget;
    QHBoxLayout *horizontalLayout;
    QLabel *label;
    QLineEdit *name;
    QLabel *error;
    QWidget *widget1;
    QHBoxLayout *horizontalLayout_2;
    QSpacerItem *horizontalSpacer;
    QPushButton *FinishButton;
    QPushButton *CancelButton;

    void setupUi(QDialog *ItemEditForm)
    {
        if (ItemEditForm->objectName().isEmpty())
            ItemEditForm->setObjectName(QStringLiteral("ItemEditForm"));
        ItemEditForm->resize(324, 111);
        ItemEditForm->setStyleSheet(QLatin1String("QDialog#ItemEditForm{\n"
"\n"
"background-color:#E8E8E8;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 16px;\n"
"color:#263544;\n"
"}\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E8E8E8;\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#D1D1D1;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#F4F9F6;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#F4F9F6;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
""
                        "\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"\n"
"}\n"
"\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#837F9A;\n"
"\n"
"}\n"
"QLineEdit,QTimeEdit,QDateEdit,QSpinBox,QDateTimeEdit{ \n"
"background-color:#FFFFFF;\n"
" border: 0px solid #D1D1D1;	\n"
"\n"
"}\n"
"QLineEdit:hover,QTimeEdit:hover,QDateEdit:hover,QSpinBox:hover,QDateTimeEdit:hover{ \n"
"background-color:#FFFFFF;\n"
" border: 1px solid #D1D1D1;	\n"
"}\n"
"\n"
""));
        gridLayout = new QGridLayout(ItemEditForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        bigwidger = new QWidget(ItemEditForm);
        bigwidger->setObjectName(QStringLiteral("bigwidger"));
        verticalLayout = new QVBoxLayout(bigwidger);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        widget = new QWidget(bigwidger);
        widget->setObjectName(QStringLiteral("widget"));
        horizontalLayout = new QHBoxLayout(widget);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        label = new QLabel(widget);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout->addWidget(label);

        name = new QLineEdit(widget);
        name->setObjectName(QStringLiteral("name"));

        horizontalLayout->addWidget(name);


        verticalLayout->addWidget(widget);

        error = new QLabel(bigwidger);
        error->setObjectName(QStringLiteral("error"));

        verticalLayout->addWidget(error);

        widget1 = new QWidget(bigwidger);
        widget1->setObjectName(QStringLiteral("widget1"));
        horizontalLayout_2 = new QHBoxLayout(widget1);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer);

        FinishButton = new QPushButton(widget1);
        FinishButton->setObjectName(QStringLiteral("FinishButton"));
        FinishButton->setMinimumSize(QSize(100, 0));

        horizontalLayout_2->addWidget(FinishButton);

        CancelButton = new QPushButton(widget1);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));
        CancelButton->setMinimumSize(QSize(100, 0));

        horizontalLayout_2->addWidget(CancelButton);


        verticalLayout->addWidget(widget1);


        gridLayout->addWidget(bigwidger, 0, 0, 1, 1);


        retranslateUi(ItemEditForm);

        QMetaObject::connectSlotsByName(ItemEditForm);
    } // setupUi

    void retranslateUi(QDialog *ItemEditForm)
    {
        ItemEditForm->setWindowTitle(QApplication::translate("ItemEditForm", "Dialog", Q_NULLPTR));
        label->setText(QApplication::translate("ItemEditForm", "Name:", Q_NULLPTR));
        error->setText(QString());
        FinishButton->setText(QApplication::translate("ItemEditForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("ItemEditForm", "Cancel", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class ItemEditForm: public Ui_ItemEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_ITEMEDITFORM_H
